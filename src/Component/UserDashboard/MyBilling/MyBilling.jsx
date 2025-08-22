// import React, { useState } from 'react';
// import { RiBillLine, RiArrowDownSLine, RiArrowUpSLine, RiMoneyDollarCircleLine, RiQrCodeLine, RiTimeLine , RiCloseLine } from 'react-icons/ri';

// const MyBilling = () => {
//   const [showOrderDetails, setShowOrderDetails] = useState(false);
//   const [showQRCode, setShowQRCode] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [paymentStatus, setPaymentStatus] = useState({
//     text: 'Unpaid',
//     className: 'bg-danger text-white'
//   });

//   const toggleOrderDetails = () => {
//     setShowOrderDetails(!showOrderDetails);
//   };

//   const handleCashPayment = () => {
//     setShowQRCode(false);
//     setTimeout(() => {
//       setPaymentSuccess(true);
//       setPaymentStatus({
//         text: 'Paid',
//         className: 'bg-success text-white'
//       });
//     }, 1000);
//   };

//   const handleQRPayment = () => {
//     setPaymentSuccess(false);
//     setShowQRCode(true);
//   };

//   const handlePaymentComplete = () => {
//     setShowQRCode(false);
//     setPaymentSuccess(true);
//     setPaymentStatus({
//       text: 'Paid',
//       className: 'bg-success text-white'
//     });
//   };

//   const closeQRCode = () => {
//     setShowQRCode(false);
//   };

//   return (
//     <div className="p-3">
//       {/* Header */}
//       <header className="">
//         <div className="">
//           <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
//             <div className="d-flex align-items-center gap-2 gap-md-3 mb-2 mb-sm-0">
//               <h1 className="fs-3 fw-bold text-dark">My Bill</h1>
//             </div>
//             <div className="d-flex align-items-center gap-2 gap-md-3">
//               <div className="text-muted small text-center text-sm-end">
//                 <div>January 19, 2025</div>
//                 <div>2:45 PM</div>
//               </div>
//               <div className={`badge rounded-pill px-2 px-md-3 py-1 ${paymentStatus.className}`}>
//                 {paymentStatus.text}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="mt-3">
//         <div className="card shadow-lg">
//           <div className="card-body">
//             {/* Session Charges */}
//             <section className="border-bottom pb-3 pb-md-4 mb-3 mb-md-4">
//               <h2 className="fs-5 fs-md-4 fw-bold text-dark mb-2 mb-md-3">Session Charges</h2>
//               <div className="row g-2">
//                 <div className="col-12">
//                   <div className="d-flex justify-content-between">
//                     <span className="text-muted">Start Time</span>
//                     <span className="fw-medium">12:30 PM</span>
//                   </div>
//                 </div>
//                 <div className="col-12">
//                   <div className="d-flex justify-content-between">
//                     <span className="text-muted">End Time</span>
//                     <span className="fw-medium">2:45 PM</span>
//                   </div>
//                 </div>
//                 <div className="col-12">
//                   <div className="d-flex justify-content-between">
//                     <span className="text-muted">Duration</span>
//                     <span className="fw-medium">2 hours 15 minutes</span>
//                   </div>
//                 </div>
//                 <div className="col-12">
//                   <div className="d-flex justify-content-between">
//                     <span className="text-muted">Hourly Rate</span>
//                     <span className="fw-medium">$15.00/hour</span>
//                   </div>
//                 </div>
//                 <div className="col-12 pt-2 border-top">
//                   <div className="d-flex justify-content-between">
//                     <span className="fw-semibold text-dark">Session Subtotal</span>
//                     <span className="fw-bold text-dark">$33.75</span>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* My Orders */}
//             <section className="mb-3 mb-md-4">
//               <div className="d-flex justify-content-between align-items-center mb-2 mb-md-3">
//                 <h2 className="fs-5 fs-md-4 fw-bold text-dark m-0">My Orders</h2>
//                 <button 
//                   className="btn btn-link text-warning p-0 d-flex align-items-center gap-1 gap-md-2"
//                   onClick={toggleOrderDetails}
//                   style={{ textDecoration: 'none' }}
//                 >
//                   <span className="small fw-medium">
//                     {showOrderDetails ? 'Hide Details' : 'View Details'}
//                   </span>
//                   {showOrderDetails ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
//                 </button>
//               </div>

//               {showOrderDetails && (
//                 <div className="mb-3">
//                   <div className="row g-2 mb-3">
//                     <div className="col-12">
//                       <div className="d-flex justify-content-between align-items-center p-2 p-md-3 bg-light rounded mb-2">
//                         <div className="d-flex align-items-center gap-2 gap-md-3">
//                           <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>🍔</div>
//                           <div>
//                             <div className="fw-medium">Deluxe Burger</div>
//                             <div className="text-muted small">Qty: 2</div>
//                           </div>
//                         </div>
//                         <span className="fw-semibold">$24.00</span>
//                       </div>
//                     </div>

//                     <div className="col-12">
//                       <div className="d-flex justify-content-between align-items-center p-2 p-md-3 bg-light rounded mb-2">
//                         <div className="d-flex align-items-center gap-2 gap-md-3">
//                           <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>🍹</div>
//                           <div>
//                             <div className="fw-medium">Energy Drink</div>
//                             <div className="text-muted small">Qty: 3</div>
//                           </div>
//                         </div>
//                         <span className="fw-semibold">$9.00</span>
//                       </div>
//                     </div>

//                     <div className="col-12">
//                       <div className="d-flex justify-content-between align-items-center p-2 p-md-3 bg-light rounded">
//                         <div className="d-flex align-items-center gap-2 gap-md-3">
//                           <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>🎮</div>
//                           <div>
//                             <div className="fw-medium">Extra Game Credits</div>
//                             <div className="text-muted small">Qty: 1</div>
//                           </div>
//                         </div>
//                         <span className="fw-semibold">$5.00</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="border-top pt-2 pt-md-3">
//                     <div className="d-flex justify-content-between">
//                       <span className="fw-semibold text-dark">Orders Subtotal</span>
//                       <span className="fw-bold text-dark">$38.00</span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="d-flex justify-content-between">
//                 <span className="fw-semibold text-dark">Orders Subtotal</span>
//                 <span className="fw-bold text-dark">$38.00</span>
//               </div>
//             </section>

//             {/* Summary */}
//             <section className="bg-warning bg-opacity-10 rounded-2 rounded-md-3 p-3 p-md-4 mb-3 mb-md-4">
//               <div className="row g-2">
//                 <div className="col-12">
//                   <div className="d-flex justify-content-between">
//                     <span className="text-dark">Subtotal</span>
//                     <span className="fw-medium">$71.75</span>
//                   </div>
//                 </div>
//                 <div className="col-12">
//                   <div className="d-flex justify-content-between">
//                     <span className="text-dark">Tax (8.5%)</span>
//                     <span className="fw-medium">$6.10</span>
//                   </div>
//                 </div>
//                 <div className="col-12">
//                   <div className="d-flex justify-content-between">
//                     <span className="text-dark">Service Fee</span>
//                     <span className="fw-medium">$2.50</span>
//                   </div>
//                 </div>
//                 <div className="col-12 border-top border-warning border-opacity-30 pt-2 pt-md-3">
//                   <div className="d-flex justify-content-between">
//                     <span className="fs-5 fw-bold text-dark">Total Amount</span>
//                     <span className="fs-4 fw-bold text-dark">$80.35</span>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Payment Options */}
//             <section>
//               <h3 className="fs-5 fw-bold text-dark mb-2 mb-md-3">Payment Options</h3>

//               <div className="row g-2 g-md-3 mb-3">
//                 <div className="col-12 col-md-6">
//                   <button 
//                     className="btn btn-warning text-dark fw-bold w-100 py-2 py-md-3 d-flex align-items-center justify-content-center gap-1 gap-md-2"
//                     onClick={handleCashPayment}
//                     style={{ borderRadius: '8px' }}
//                   >
//                     <RiMoneyDollarCircleLine style={{ fontSize: '1rem' }} />
//                     <span>Pay with Cash</span>
//                   </button>
//                 </div>
//                 <div className="col-12 col-md-6">
//                   <button 
//                     className="btn btn-dark text-white fw-bold w-100 py-2 py-md-3 d-flex align-items-center justify-content-center gap-1 gap-md-2"
//                     onClick={handleQRPayment}
//                     style={{ borderRadius: '8px' }}
//                   >
//                     <RiQrCodeLine style={{ fontSize: '1rem' }} />
//                     <span>Scan QR Code</span>
//                   </button>
//                 </div>
//               </div>

//               {showQRCode && (
//                 <div className="bg-light rounded-2 rounded-md-3 p-3 p-md-4 text-center mb-3 position-relative">
//                   <button 
//                     className="position-absolute top-0 end-0 m-2 m-md-3 btn btn-sm btn-outline-secondary"
//                     onClick={closeQRCode}
//                   >
//                     <RiCloseLine />
//                   </button>
//                   <h4 className="fs-5 fw-semibold text-dark mb-2 mb-md-3">Scan & Pay</h4>
//                   <div className="bg-white p-2 p-md-3 rounded-2 rounded-md-3 d-inline-block shadow-sm">
//                     <div className="rounded d-flex align-items-center justify-content-center mx-auto" 
//                       style={{ 
//                         width: '150px', 
//                         height: '150px',
//                         maxWidth: '100%',
//                         backgroundColor: '#f8f9fa' 
//                       }}>
//                       <div className="text-center">
//                         <div className="mx-auto mb-1 mb-md-2" style={{ 
//                           width: '50px', 
//                           height: '50px',
//                           display: 'flex', 
//                           alignItems: 'center', 
//                           justifyContent: 'center' 
//                         }}>
//                           <RiQrCodeLine style={{ fontSize: '2rem', color: '#adb5bd' }} />
//                         </div>
//                         <div className="text-muted small">QR Code</div>
//                         <div className="text-muted" style={{ fontSize: '0.7rem' }}>$80.35</div>
//                       </div>
//                     </div>
//                   </div>
//                   <p className="text-muted small mt-2 mt-md-3">Use your mobile banking app to scan and pay</p>
//                   <div className="mt-2 mt-md-3">
//                     <div className="d-inline-flex align-items-center gap-1 gap-md-2 px-2 px-md-3 py-1 bg-warning bg-opacity-25 text-warning-emphasis rounded-pill small">
//                       <RiTimeLine style={{ fontSize: '0.8rem' }} />
//                       <span>Waiting for payment...</span>
//                     </div>
//                   </div>
//                   <button 
//                     className="btn btn-success mt-3 mt-md-4"
//                     onClick={handlePaymentComplete}
//                   >
//                     I've Completed Payment
//                   </button>
//                 </div>
//               )}

//               {paymentSuccess && (
//                 <div className="bg-success bg-opacity-10 border border-success border-opacity-25 rounded-2 rounded-md-3 p-3 p-md-4 text-center">
//                   <div className="mx-auto mb-2 mb-md-3" style={{ 
//                     width: '40px', 
//                     height: '40px',
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     justifyContent: 'center' 
//                   }}>

//                   </div>
//                   <h4 className="fs-5 fw-semibold text-success mb-1 mb-md-2">Payment Successful!</h4>
//                   <p className="text-success small">Your payment of $80.35 has been processed.</p>
//                 </div>
//               )}
//             </section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyBilling;





import React, { useState, useEffect } from 'react';
import { RiBillLine, RiArrowDownSLine, RiArrowUpSLine, RiMoneyDollarCircleLine, RiQrCodeLine, RiTimeLine, RiCloseLine } from 'react-icons/ri';
import axiosInstance from '../../../utils/axiosInstance';
import axios from 'axios';

const MyBilling = () => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get session ID from URL or props (adjust based on your routing)
  const sessionId = 1; // This should come from your router params or props

  // Payment status based on API data
  const [paymentStatus, setPaymentStatus] = useState({
    text: 'Unpaid',
    className: 'bg-danger text-white'
  });

  useEffect(() => {
    fetchBillData();
  }, [sessionId]);

  const fetchBillData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/billing/session/${sessionId}`, 
        {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      
      if (response.data.success) {
        setBillData(response.data.data.bill);
        
        // Set payment status based on API response
        if (response.data.data.bill.payment_status === 'paid') {
          setPaymentStatus({
            text: 'Paid',
            className: 'bg-success text-white'
          });
          setPaymentSuccess(true);
        }
      } else {
        // If API returns success: false but no error
        setError('No billing data available');
      }
    } catch (err) {
      // For any error (network error, 404, etc.), show "No billing data available"
      setError('No billing data available');
      console.error('Error fetching bill data:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderDetails = () => {
    setShowOrderDetails(!showOrderDetails);
  };

  const handleCashPayment = () => {
    setShowQRCode(false);
    setTimeout(() => {
      setPaymentSuccess(true);
      setPaymentStatus({
        text: 'Paid',
        className: 'bg-success text-white'
      });
    }, 1000);
  };

  const handleQRPayment = () => {
    setPaymentSuccess(false);
    setShowQRCode(true);
  };

  const handlePaymentComplete = () => {
    setShowQRCode(false);
    setPaymentSuccess(true);
    setPaymentStatus({
      text: 'Paid',
      className: 'bg-success text-white'
    });
  };

  const closeQRCode = () => {
    setShowQRCode(false);
  };

  // Format date and time functions
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Calculate duration display
  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return '';
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end - start;
    
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours} hours ${minutes} minutes`;
  };

  if (loading) {
    return (
      <div className="p-3 d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="alert alert-info" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!billData) {
    return (
      <div className="p-3 d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="alert alert-info" role="alert">
          No billing data available
        </div>
      </div>
    );
  }

  return (
    <div className="p-3">
      {/* Header */}
      <header className="">
        <div className="">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2 gap-md-3 mb-2 mb-sm-0">
              <h1 className="fs-3 fw-bold text-dark">My Bill</h1>
            </div>
            <div className="d-flex align-items-center gap-2 gap-md-3">
              <div className="text-muted small text-center text-sm-end">
                <div>{formatDate(billData.session.start_time)}</div>
                <div>{formatTime(billData.session.start_time)}</div>
              </div>
              <div className={`badge rounded-pill px-2 px-md-3 py-1 ${paymentStatus.className}`}>
                {paymentStatus.text}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mt-3">
        <div className="card shadow-lg">
          <div className="card-body">
            {/* Session Charges */}
            <section className="border-bottom pb-3 pb-md-4 mb-3 mb-md-4">
              <h2 className="fs-5 fs-md-4 fw-bold text-dark mb-2 mb-md-3">Session Charges</h2>
              <div className="row g-2">
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Start Time</span>
                    <span className="fw-medium">{formatTime(billData.session.start_time)}</span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">End Time</span>
                    <span className="fw-medium">{formatTime(billData.session.end_time)}</span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Duration</span>
                    <span className="fw-medium">{billData.session.duration_display}</span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Hourly Rate</span>
                    <span className="fw-medium">${parseFloat(billData.session.hourly_rate).toFixed(2)}/hour</span>
                  </div>
                </div>
                <div className="col-12 pt-2 border-top">
                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold text-dark">Session Subtotal</span>
                    <span className="fw-bold text-dark">${parseFloat(billData.session.session_cost).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* My Orders */}
            <section className="mb-3 mb-md-4">
              <div className="d-flex justify-content-between align-items-center mb-2 mb-md-3">
                <h2 className="fs-5 fs-md-4 fw-bold text-dark m-0">My Orders</h2>
                {billData.orders && billData.orders.length > 0 && (
                  <button 
                    className="btn btn-link text-warning p-0 d-flex align-items-center gap-1 gap-md-2"
                    onClick={toggleOrderDetails}
                    style={{ textDecoration: 'none' }}
                  >
                    <span className="small fw-medium">
                      {showOrderDetails ? 'Hide Details' : 'View Details'}
                    </span>
                    {showOrderDetails ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                  </button>
                )}
              </div>
              
              {billData.orders && billData.orders.length > 0 ? (
                <>
                  {showOrderDetails && (
                    <div className="mb-3">
                      <div className="row g-2 mb-3">
                        {billData.orders.map((order, index) => (
                          <div className="col-12" key={index}>
                            <div className="d-flex justify-content-between align-items-center p-2 p-md-3 bg-light rounded mb-2">
                              <div className="d-flex align-items-center gap-2 gap-md-3">
                                <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>🍔</div>
                                <div>
                                  <div className="fw-medium">Order #{order.order_number}</div>
                                  <div className="text-muted small">{order.items_summary}</div>
                                </div>
                              </div>
                              <span className="fw-semibold">${parseFloat(order.total_amount).toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-top pt-2 pt-md-3">
                        <div className="d-flex justify-content-between">
                          <span className="fw-semibold text-dark">Orders Subtotal</span>
                          <span className="fw-bold text-dark">${parseFloat(billData.totals.order_subtotal).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold text-dark">Orders Subtotal</span>
                    <span className="fw-bold text-dark">${parseFloat(billData.totals.order_subtotal).toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-3">
                  <p className="text-muted">No orders placed during this session</p>
                </div>
              )}
            </section>

            {/* Summary */}
            <section className="bg-warning bg-opacity-10 rounded-2 rounded-md-3 p-3 p-md-4 mb-3 mb-md-4">
              <div className="row g-2">
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <span className="text-dark">Subtotal</span>
                    <span className="fw-medium">
                      ${(parseFloat(billData.session.session_cost) + parseFloat(billData.totals.order_subtotal || 0)).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <span className="text-dark">Tax ({billData.totals.tax_amount ? '8.5%' : '0%'})</span>
                    <span className="fw-medium">${parseFloat(billData.totals.tax_amount || 0).toFixed(2)}</span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <span className="text-dark">Service Fee</span>
                    <span className="fw-medium">$2.50</span>
                  </div>
                </div>
                <div className="col-12 border-top border-warning border-opacity-30 pt-2 pt-md-3">
                  <div className="d-flex justify-content-between">
                    <span className="fs-5 fw-bold text-dark">Total Amount</span>
                    <span className="fs-4 fw-bold text-dark">
                      ${
                        (
                          parseFloat(billData.session.session_cost) + 
                          parseFloat(billData.totals.order_subtotal || 0) + 
                          parseFloat(billData.totals.tax_amount || 0) + 
                          2.50 // Service fee
                        ).toFixed(2)
                      }
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Options - Only show if not paid */}
            {!paymentSuccess && (
              <section>
                <h3 className="fs-5 fw-bold text-dark mb-2 mb-md-3">Payment Options</h3>
                
                <div className="row g-2 g-md-3 mb-3">
                  <div className="col-12 col-md-6">
                    <button 
                      className="btn btn-warning text-dark fw-bold w-100 py-2 py-md-3 d-flex align-items-center justify-content-center gap-1 gap-md-2"
                      onClick={handleCashPayment}
                      style={{ borderRadius: '8px' }}
                    >
                      <RiMoneyDollarCircleLine style={{ fontSize: '1rem' }} />
                      <span>Pay with Cash</span>
                    </button>
                  </div>
                  <div className="col-12 col-md-6">
                    <button 
                      className="btn btn-dark text-white fw-bold w-100 py-2 py-md-3 d-flex align-items-center justify-content-center gap-1 gap-md-2"
                      onClick={handleQRPayment}
                      style={{ borderRadius: '8px' }}
                    >
                      <RiQrCodeLine style={{ fontSize: '1rem' }} />
                      <span>Scan QR Code</span>
                    </button>
                  </div>
                </div>
                
                {showQRCode && (
                  <div className="bg-light rounded-2 rounded-md-3 p-3 p-md-4 text-center mb-3 position-relative">
                    <button 
                      className="position-absolute top-0 end-0 m-2 m-md-3 btn btn-sm btn-outline-secondary"
                      onClick={closeQRCode}
                    >
                      <RiCloseLine />
                    </button>
                    <h4 className="fs-5 fw-semibold text-dark mb-2 mb-md-3">Scan & Pay</h4>
                    <div className="bg-white p-2 p-md-3 rounded-2 rounded-md-3 d-inline-block shadow-sm">
                      <div className="rounded d-flex align-items-center justify-content-center mx-auto" 
                        style={{ 
                          width: '150px', 
                          height: '150px',
                          maxWidth: '100%',
                          backgroundColor: '#f8f9fa' 
                        }}>
                        <div className="text-center">
                          <div className="mx-auto mb-1 mb-md-2" style={{ 
                            width: '50px', 
                            height: '50px',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}>
                            <RiQrCodeLine style={{ fontSize: '2rem', color: '#adb5bd' }} />
                          </div>
                          <div className="text-muted small">QR Code</div>
                          <div className="text-muted" style={{ fontSize: '0.7rem' }}>
                            ${
                              (
                                parseFloat(billData.session.session_cost) + 
                                parseFloat(billData.totals.order_subtotal || 0) + 
                                parseFloat(billData.totals.tax_amount || 0) + 
                                2.50 // Service fee
                              ).toFixed(2)
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted small mt-2 mt-md-3">Use your mobile banking app to scan and pay</p>
                    <div className="mt-2 mt-md-3">
                      <div className="d-inline-flex align-items-center gap-1 gap-md-2 px-2 px-md-3 py-1 bg-warning bg-opacity-25 text-warning-emphasis rounded-pill small">
                        <RiTimeLine style={{ fontSize: '0.8rem' }} />
                        <span>Waiting for payment...</span>
                      </div>
                    </div>
                    <button 
                      className="btn btn-success mt-3 mt-md-4"
                      onClick={handlePaymentComplete}
                    >
                      I've Completed Payment
                    </button>
                  </div>
                )}
              </section>
            )}
            
            {paymentSuccess && (
              <div className="bg-success bg-opacity-10 border border-success border-opacity-25 rounded-2 rounded-md-3 p-3 p-md-4 text-center">
                <div className="mx-auto mb-2 mb-md-3" style={{ 
                  width: '40px', 
                  height: '40px',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  {/* You can add a checkmark icon here */}
                </div>
                <h4 className="fs-5 fw-semibold text-success mb-1 mb-md-2">Payment Successful!</h4>
                <p className="text-success small">
                  Your payment of $
                  {
                    (
                      parseFloat(billData.session.session_cost) + 
                      parseFloat(billData.totals.order_subtotal || 0) + 
                      parseFloat(billData.totals.tax_amount || 0) + 
                      2.50 // Service fee
                    ).toFixed(2)
                  } has been processed.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBilling;  