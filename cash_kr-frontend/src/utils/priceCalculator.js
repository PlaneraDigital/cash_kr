// ─── ISSUE DEDUCTION PERCENTAGES ────────────────────────────────────────────
export const ISSUE_DEDUCTIONS = {
  // Physical Issues
  glass_crack: 40,
  back_panel: 17,
  camera_glass_broken: 8,
  // Technical Issues
  battery_service: 13,
  front_camera: 8,
  back_camera: 15,
  volume_button: 4,
  wifi_issue: 39,
  finger_touch: 26,
  face_unlock: 26,
  speaker_faulty: 4,
  power_button: 2,
  charging_port: 10,
  audio_receiver: 7,
  bluetooth: 39,
  vibrator: 2,
  microphone: 2,
  proximity_sensor: 3,
};

// ─── MOBILE PRICE CALCULATOR (Sequential / Cascading deduction model) ───────
// Each deduction is applied to the already-reduced price, NOT the base price.
// Order: Age → Dead → Touch → Screen Originality → Warranty → GST Bill → eSIM → Charger → Box → Issues
export function calculatePrice({
  basePrice,
  deviceAge,
  ableToMakeCalls,
  isTouchScreenWorking,
  isScreenOriginal,
  underWarranty,
  hasGSTBill,
  eSIMSupport,
  physicalIssues = [],
  technicalIssues = [],
  hasCharger,
  hasBox,
}) {
  const breakdown = {};
  let currentPrice = basePrice;

  // Helper: apply a percentage deduction to currentPrice and record it
  const applyDeduction = (key, pct) => {
    const deduction = Math.round(currentPrice * (pct / 100));
    breakdown[key] = pct;
    currentPrice = Math.max(currentPrice - deduction, 0);
  };

  // 1. Age deduction (applied first to base price)
  const ageDeductions = { '0 - 3 Months': 0, '3 - 6 Months': 7, '6 - 11 Months': 10, 'Above 11 Months': 21 };
  const agePct = ageDeductions[deviceAge] ?? 7;
  if (agePct > 0) applyDeduction('age', agePct);

  // 2. Dead device (cannot make calls) — 90%
  if (ableToMakeCalls === false) {
    applyDeduction('dead', 90);
  }

  // 3. Touch screen faulty — 65%
  if (isTouchScreenWorking === false) {
    applyDeduction('screenFaulty', 65);
  }

  // 4. Non-original screen — 50%
  if (isScreenOriginal === false) {
    applyDeduction('copyScreen', 50);
  }

  // 5. Out of warranty — 20%
  // NOTE: If device is >11 months old, warranty is automatically "No" with NO deduction
  if (underWarranty === false && deviceAge !== 'Above 11 Months') {
    applyDeduction('outOfWarranty', 20);
  }

  // 6. No GST bill — 21%
  if (hasGSTBill === false) {
    applyDeduction('noBill', 21);
  }

  // 7. eSIM only global variant — 6%
  if (eSIMSupport === 'esim_only_global') {
    applyDeduction('eSIM', 6);
  }

  // 8. No charger — 3%
  if (hasCharger === false) {
    applyDeduction('noCharger', 3);
  }

  // 9. No box — 5%
  if (hasBox === false) {
    applyDeduction('noBox', 5);
  }

  // 10. Physical + technical issues (each issue applied sequentially)
  for (const id of [...physicalIssues, ...technicalIssues]) {
    const pct = ISSUE_DEDUCTIONS[id];
    if (pct > 0) {
      applyDeduction(`issue_${id}`, pct);
    }
  }

  const totalDeductionPct = basePrice > 0
    ? Math.round(((basePrice - currentPrice) / basePrice) * 100)
    : 0;

  const finalPrice = Math.max(currentPrice, 0);

  return {
    basePrice,
    totalDeductionPct,
    breakdown,
    finalPrice,
  };
}


export function calculateLaptopPrice(device, selections) {
  const { ram, storage, yearBracket, condition, screenCondition, 
          functionalIssues = [], accessories } = selections;
  
  let variant = device.variants.find(v => 
    v.ram === ram && 
    v.storage === storage &&
    (!selections.processor || v.processor === selections.processor) &&
    (!selections.generation || v.generation === selections.generation)
  );

  let basePrice = 0;

  if (variant) {
    basePrice = variant.basePrice;
  } else {
    // Fallback: Use the first variant as baseline and adjust
    const baseline = device.variants[0];
    basePrice = baseline.basePrice;
    
    // Simple RAM Adjustment
    const ramVal = (r) => parseInt(r) || 8;
    basePrice += (ramVal(ram) - ramVal(baseline.ram)) * 200; // ~200 per GB diff

    // Robust Storage Adjustment
    const parseStorage = (s) => {
      if (!s) return 0;
      let totalGB = 0;
      // Handle dual drives like "1 TB HDD + 128 GB SSD"
      const parts = s.split('+');
      parts.forEach(p => {
        const val = parseInt(p.trim()) || 0;
        const isTB = p.toUpperCase().includes('TB');
        totalGB += isTB ? val * 1024 : val;
      });
      return totalGB;
    };

    const baselineGB = parseStorage(baseline.storage);
    const selectedGB = parseStorage(storage);
    
    // Add value for more storage, subtract for less
    basePrice += (selectedGB - baselineGB) * 5; // ~5 per GB diff (approximate)

    // Extra penalty if the main drive is HDD instead of SSD
    if (storage.includes('HDD') && !baseline.storage.includes('HDD')) {
      basePrice -= 1500;
    }
  }
  
  const ageMult = device.ageMultipliers?.[yearBracket] || 1;
  const condMult = device.conditionMultipliers?.[condition] || 1;
  const screenMult = device.screenMultipliers?.[screenCondition] || 1;
  const sizeMult = device.screenSizeMultipliers?.[selections.screenSize] || 1;
  
  const ageAdj   = Math.round(basePrice * ageMult) - basePrice;
  const condBase = Math.round(basePrice * ageMult);
  const condAdj  = Math.round(condBase * condMult) - condBase;
  const screenBase = condBase + condAdj;
  const screenAdj  = Math.round(screenBase * screenMult) - screenBase;
  
  const deductionTotal = (functionalIssues || [])
    .filter(i => i !== 'noIssues')
    .reduce((sum, issue) => sum + (device.functionalDeductions?.[issue] || 0), 0);
  
  // New Bonuses
  const gpuBonus = device.dedicatedGpuBonus?.[selections.gpuModel] || 0;
  
  const accList = Array.isArray(accessories) ? accessories : [];
  const accBonus = accList.reduce((sum, item) => sum + (device.accessoriesBonus?.[item] || 0), 0);
  
  const rawFinal = (screenBase + screenAdj) * sizeMult - deductionTotal + gpuBonus + accBonus;
  const finalPrice = Math.max(Math.round(rawFinal / 100) * 100, 0);
  
  return {
    basePrice,
    ageAdjustment: ageAdj,
    conditionAdjustment: condAdj,
    screenAdjustment: screenAdj,
    functionalDeduction: -deductionTotal,
    accessoriesBonus: accBonus,
    finalPrice,
  };
}
