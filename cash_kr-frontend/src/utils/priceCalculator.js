import { isSpecialModel } from './specialModels';

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
  brand,
  modelName,
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
  const isSpecial = isSpecialModel(brand, modelName);

  // Helper: apply a percentage deduction to currentPrice and record it
  const applyDeduction = (key, pct) => {
    const deduction = Math.round(currentPrice * (pct / 100));
    breakdown[key] = pct;
    currentPrice = Math.max(currentPrice - deduction, 0);
  };

  // 1. Age deduction (applied first to base price)
  const ageDeductions = { '0 - 3 Months': 0, '3 - 6 Months': 7, '6 - 11 Months': 10, 'Above 11 Months': 21 };
  const agePct = isSpecial ? 0 : (ageDeductions[deviceAge] ?? 7);
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
  if (!isSpecial && underWarranty === false && deviceAge !== 'Above 11 Months') {
    applyDeduction('outOfWarranty', 20);
  }

  // 6. No GST bill — 21%
  // If device is > 11 months old, we do not apply the no GST bill deduction separately
  if (!isSpecial && hasGSTBill === false && deviceAge !== 'Above 11 Months') {
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


function getProcessorIncrement(processorStr) {
  if (!processorStr) return { base: 2500, increment: 0 };
  const p = processorStr.toLowerCase();
  const isRyzen = p.includes('ryzen');

  // Core i9 / Ryzen 9 (Any Gen) / Core Ultra 9 / Snapdragon X Elite
  if (p.includes('i9') || p.includes('ryzen 9') || p.includes('ultra 9') || p.includes('elite')) {
    return { base: 5000, increment: 20000 };
  }

  // Core i7 / Ryzen 7 / Core Ultra 7
  if (p.includes('i7') || p.includes('ryzen 7') || p.includes('ultra 7')) {
    if (isRyzen) {
      if (p.includes('6th gen') || p.includes('7th gen') || p.includes('8th gen')) {
        return { base: 5000, increment: 14000 };
      }
      return { base: 5000, increment: 5500 };
    } else {
      // Intel
      if (p.includes('12th') || p.includes('13th') || p.includes('14th') || p.includes('ultra')) {
        return { base: 5000, increment: 14000 };
      }
      if (p.includes('8th') || p.includes('9th') || p.includes('10th') || p.includes('11th')) {
        return { base: 5000, increment: 5500 };
      }
      return { base: 2500, increment: 0 };
    }
  }

  // Core i5 / Ryzen 5 / Core Ultra 5
  if (p.includes('i5') || p.includes('ryzen 5') || p.includes('ultra 5')) {
    if (isRyzen) {
      if (p.includes('6th gen') || p.includes('7th gen') || p.includes('8th gen')) {
        return { base: 5000, increment: 8500 };
      }
      return { base: 5000, increment: 3500 };
    } else {
      // Intel
      if (p.includes('12th') || p.includes('13th') || p.includes('14th') || p.includes('ultra')) {
        return { base: 5000, increment: 8500 };
      }
      if (p.includes('8th') || p.includes('9th') || p.includes('10th') || p.includes('11th')) {
        return { base: 5000, increment: 3500 };
      }
      return { base: 2500, increment: 0 };
    }
  }

  // Core i3 / Ryzen 3 / Core Ultra 3
  if (p.includes('i3') || p.includes('ryzen 3') || p.includes('ultra 3')) {
    if (isRyzen) {
      if (p.includes('6th gen') || p.includes('7th gen') || p.includes('8th gen')) {
        return { base: 5000, increment: 4500 };
      }
      return { base: 5000, increment: 1500 };
    } else {
      // Intel
      if (p.includes('12th') || p.includes('13th') || p.includes('14th') || p.includes('ultra')) {
        return { base: 5000, increment: 4500 };
      }
      if (p.includes('8th') || p.includes('9th') || p.includes('10th') || p.includes('11th')) {
        return { base: 5000, increment: 1500 };
      }
      return { base: 2500, increment: 0 };
    }
  }

  // Default / older
  return { base: 2500, increment: 0 };
}

function getRamIncrement(ramStr) {
  if (!ramStr) return 0;
  const num = parseInt(ramStr) || 0;
  if (num >= 32) return 5500;
  if (num >= 16) return 2800;
  if (num >= 8) return 1200;
  return 0;
}

function getStorageIncrement(storageStr) {
  if (!storageStr) return 0;
  const s = storageStr.toLowerCase();
  
  let ssdPart = '';
  if (s.includes('+')) {
    const parts = s.split('+');
    ssdPart = parts.find(p => p.includes('ssd')) || '';
  } else if (s.includes('ssd')) {
    ssdPart = s;
  }
  
  if (!ssdPart) return 0;
  
  const match = ssdPart.match(/(\d+)\s*(gb|tb)/);
  if (!match) return 0;
  
  let val = parseInt(match[1]);
  const unit = match[2];
  if (unit === 'tb') {
    val = val * 1024;
  }
  
  if (val >= 1024) return 4500;
  if (val >= 512) return 2200;
  if (val >= 256) return 1000;
  return 0;
}

function getGpuIncrement(gpuStr) {
  if (!gpuStr) return 0;
  const g = gpuStr.toLowerCase();
  if (g.includes('3070') || g.includes('4070') || g.includes('3080') || g.includes('4080') || g.includes('3090') || g.includes('4090')) {
    return 20000;
  }
  if (g.includes('4050') || g.includes('3060') || g.includes('4060')) {
    return 11000;
  }
  if (g.includes('1650') || g.includes('2050') || g.includes('3050') || g.includes('1660')) {
    return 5000;
  }
  return 0;
}

function getScreenSizeIncrement(sizeKey) {
  if (sizeKey === '10-11') return 150;
  if (sizeKey === '12-13') return 175;
  if (sizeKey === '14-15') return 210;
  if (sizeKey === 'above15') return 250;
  return 0;
}

function getBrandMultiplier(modelName) {
  if (!modelName) return 1.0;
  const m = modelName.toLowerCase();
  
  if (m.includes('alienware') || m.includes('omen') || m.includes('legion') || m.includes('rog')) {
    return 1.40;
  }
  if (m.includes('xps') || m.includes('spectre') || m.includes('thinkpad x1') || m.includes('zenbook')) {
    return 1.35;
  }
  if (m.includes('pavilion') || m.includes('vostro') || m.includes('thinkpad e') || m.includes('vivobook')) {
    return 1.15;
  }
  return 1.0;
}

export function calculateLaptopPrice(device, selections) {
  const { ram, storage, yearBracket,
          functionalIssues = [], screenIssues = [], bodyIssues = [],
          accessories, powerStatus, screenSize } = selections;
  
  let basePrice = 0;

  if (device.brand === 'Apple') {
    // ── 1. Find base price from variant for Apple ──
    let variant = device.variants.find(v => 
      v.ram === ram && 
      v.storage === storage &&
      (!selections.processor || v.processor === selections.processor) &&
      (!selections.generation || v.generation === selections.generation)
    );

    if (variant) {
      basePrice = variant.basePrice;
    } else if (device.variants.length === 1 && !device.variants[0].ram) {
      // Single-variant device (flat price, e.g., Apple models)
      basePrice = device.variants[0].basePrice;
    } else {
      // Fallback: Use the first variant as baseline and adjust
      const baseline = device.variants[0];
      basePrice = baseline.basePrice;
      
      const ramVal = (r) => parseInt(r) || 8;
      basePrice += (ramVal(ram) - ramVal(baseline.ram)) * 200;

      const parseStorage = (s) => {
        if (!s) return 0;
        let totalGB = 0;
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
      basePrice += (selectedGB - baselineGB) * 5;
    }
  } else {
    // ── 1. Windows Laptop Bottom-Up valuation ──
    const processor = selections.processor || device.processorFamily || '';
    const gpu = device.gpuType || '';
    
    // Shell Base Value & CPU
    const { base: functionalBase, increment: cpuIncrement } = getProcessorIncrement(processor);
    
    // RAM Increment
    const ramIncrement = getRamIncrement(ram);
    
    // Storage Increment
    const storageIncrement = getStorageIncrement(storage);
    
    // Dedicated GPU Increment
    const gpuIncrement = getGpuIncrement(gpu);
    
    // Screen Size Increment
    const screenSizeIncrement = getScreenSizeIncrement(screenSize);
    
    // Brand Tier & Build Quality Multiplier
    const brandMultiplier = getBrandMultiplier(device.modelName);
    
    const sumOfComponents = functionalBase + cpuIncrement + ramIncrement + storageIncrement + gpuIncrement + screenSizeIncrement;
    basePrice = Math.round(sumOfComponents * brandMultiplier);
  }

  // ── 2. Age multiplier (applied first) ──
  const ageMult = device.ageMultipliers?.[yearBracket] || 1;
  let currentPrice = Math.round(basePrice * ageMult);
  const ageAdjustment = currentPrice - basePrice;

  // ── 2.5 Power status deduction (if laptop is off, reduce 95% of base price) ──
  let powerDeduction = 0;
  if (powerStatus === 'off') {
    powerDeduction = Math.round(basePrice * 0.95);
    currentPrice = Math.max(currentPrice - powerDeduction, 0);
  }

  // ── 3. Functional issues — percentage-based sequential deductions ──
  let functionalDeduction = 0;
  const funcIssues = (functionalIssues || []).filter(i => i !== 'noIssues');
  for (const issue of funcIssues) {
    const pct = device.functionalDeductions?.[issue] || 0;
    if (pct > 0) {
      const deduction = Math.round(currentPrice * (pct / 100));
      functionalDeduction += deduction;
      currentPrice -= deduction;
    }
  }

  // ── 4. Screen issues — percentage-based sequential deductions ──
  let screenDeduction = 0;
  const scrIssues = (screenIssues || []).filter(i => i !== 'noIssue');
  for (const issue of scrIssues) {
    const pct = device.screenDeductions?.[issue] || 0;
    if (pct > 0) {
      const deduction = Math.round(currentPrice * (pct / 100));
      screenDeduction += deduction;
      currentPrice -= deduction;
    }
  }

  // ── 5. Body issues — percentage-based sequential deductions ──
  let bodyDeduction = 0;
  for (const issue of (bodyIssues || [])) {
    const pct = device.bodyDeductions?.[issue] || 0;
    if (pct > 0) {
      const deduction = Math.round(currentPrice * (pct / 100));
      bodyDeduction += deduction;
      currentPrice -= deduction;
    }
  }

  // ── 6. Accessories bonus ──
  const accList = Array.isArray(accessories) ? [...accessories] : [];
  // If the device age is > 11 months, we do not penalize for missing bill
  if (yearBracket && yearBracket !== 'lessThan1' && !accList.includes('bill')) {
    accList.push('bill');
  }
  const accBonus = accList.reduce((sum, item) => sum + (device.accessoriesBonus?.[item] || 0), 0);
  currentPrice += accBonus;

  const finalPrice = Math.max(Math.round(currentPrice / 100) * 100, 0);
  
  return {
    basePrice,
    ageAdjustment,
    powerDeduction: -powerDeduction,
    functionalDeduction: -functionalDeduction,
    screenDeduction: -screenDeduction,
    bodyDeduction: -bodyDeduction,
    accessoriesBonus: accBonus,
    finalPrice,
  };
}
