import { useEffect, useState } from 'react';
import { adminService } from '../../services/admin.service';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import './admin.css';

const ORDER_STATUSES = [
  'placed', 
  'scheduled', 
  'assigned', 
  'picked', 
  'verified', 
  'payment_initiated', 
  'completed', 
  'cancelled'
];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchOrders = () => {
    setLoading(true);
    const params = { page, limit: 10 };
    if (debouncedSearch) params.search = debouncedSearch;
    if (status) params.status = status;

    adminService.getOrders(params)
      .then((res) => {
        setOrders(res.data.orders);
        setTotal(res.data.total);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load orders', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [debouncedSearch, status, page]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await adminService.updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed': return 'admin-badge admin-badge-green';
      case 'cancelled': return 'admin-badge admin-badge-red';
      case 'placed': return 'admin-badge admin-badge-blue';
      case 'scheduled': return 'admin-badge admin-badge-purple';
      case 'verified': return 'admin-badge admin-badge-blue';
      case 'payment_initiated': return 'admin-badge admin-badge-yellow';
      default: return 'admin-badge admin-badge-gray';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              className="admin-search pl-10"
              placeholder="Search ID, brand or model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          </div>

          <select
            className="admin-select"
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          >
            <option value="">All Statuses</option>
            {ORDER_STATUSES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="text-sm font-semibold text-slate-500">
          Total Orders: <span className="text-slate-900 font-bold">{total}</span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-table-wrapper">
        {loading ? (
          <div className="p-12 space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 admin-skeleton w-full" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            No system orders found.
          </div>
        ) : (
          <>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User Contact</th>
                  <th>Device Specifications</th>
                  <th>Pricing Offered</th>
                  <th>Ordered At</th>
                  <th>Current Status</th>
                  <th className="text-right">Change Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <span className="font-mono text-xs text-blue-600 font-bold">{order.orderId}</span>
                    </td>
                    <td>
                      {order.userId ? (
                        <div>
                          <div className="font-bold text-slate-900">{order.userId.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{order.userId.phone}</div>
                          <div className="text-[10px] text-slate-400">{order.userId.email}</div>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Guest / Deleted User</span>
                      )}
                    </td>
                    <td>
                      <div>
                        <div className="font-bold text-slate-900">{order.device.brand} {order.device.modelName}</div>
                        <div className="text-[10px] text-slate-400 font-semibold capitalize">
                          {order.device.storage} {order.device.ram && `/ ${order.device.ram}`} {order.device.generation && `(${order.device.generation})`}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold text-slate-900">₹{order.priceBreakdown?.finalPrice || 0}</div>
                      <div className="text-[9px] text-slate-400">Base: ₹{order.priceBreakdown?.basePrice || 0}</div>
                    </td>
                    <td className="text-xs">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td>
                      <span className={getStatusBadgeClass(order.status)}>
                        {order.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <select
                        className="admin-select text-xs py-1 px-2.5"
                        disabled={updatingId === order._id}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        {ORDER_STATUSES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="admin-pagination">
              <div className="admin-pagination-info">
                Page {page} of {totalPages}
              </div>
              <div className="admin-pagination-btns">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="admin-pagination-btn"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="admin-pagination-btn"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
