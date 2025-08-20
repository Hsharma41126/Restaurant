import React, { useState, useEffect } from 'react';
import {
    RiNotification3Line,
    RiNotification3Fill,
    RiInformationLine,
    RiSettings3Line,
    RiMoneyDollarCircleLine,
    RiPauseLine,
    RiStopLine,
    RiHistoryLine,
    RiTimeLine,
    RiCheckLine,
    RiCloseLine
} from 'react-icons/ri';
import { Link } from 'react-router-dom';
const SessionTracker = () => {
    // Timer state
    const [elapsedSeconds, setElapsedSeconds] = useState(5136); // 1:25:36
    const [totalSeconds, setTotalSeconds] = useState(7200); // 2 hours
    const [isWarningState, setIsWarningState] = useState(false);
    const [isExtended, setIsExtended] = useState(false);

    // Notifications
    const [notifications, setNotifications] = useState([]);
    const [showNotificationDot, setShowNotificationDot] = useState(true);

    // Format time helper
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Calculate progress
    const progressPercent = (elapsedSeconds / totalSeconds) * 100;
    const remainingSeconds = totalSeconds - elapsedSeconds;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (progressPercent / 100) * circumference;

    // Timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedSeconds(prev => {
                if (prev >= totalSeconds) {
                    showNotification('🔔 Session has ended!', 'error');
                    return prev;
                }
                return prev + 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [totalSeconds]);

    // Warning state effect
    useEffect(() => {
        if (remainingSeconds <= 300 && remainingSeconds > 0 && !isWarningState) {
            setIsWarningState(true);
            showNotification('⚠️ Warning: Only 5 minutes remaining!', 'warning');
        }
    }, [remainingSeconds, isWarningState]);

    // Notification system
    const showNotification = (message, type = 'info') => {
        const id = Date.now();
        const newNotification = {
            id,
            message,
            type,
            time: new Date().toLocaleTimeString()
        };

        setNotifications(prev => [...prev, newNotification]);
        setShowNotificationDot(true);

        // Auto remove after 5 seconds
        setTimeout(() => {
            removeNotification(id);
        }, 5000);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    // Extend session
    const extendSession = () => {
        setTotalSeconds(prev => prev + 1800);
        setIsExtended(true);
        showNotification('✅ Session extended by 30 minutes!', 'info');

        setTimeout(() => {
            setIsExtended(false);
        }, 3000);
    };

    // Initial notification
    useEffect(() => {
        setTimeout(() => {
            showNotification('🎮 Session started successfully!', 'info');
        }, 1000);
    }, []);

    return (
        <div className="p-3">
            {/* Navbar */}
            <nav className="">
                <div className="">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-3">
                           
                            <h1 className="fs-3 fw-bold text-dark">Session Tracker</h1>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="mt-2">
                {/* Session Info Card */}
                <div className="mb-4">
                    <div className="bg-white rounded-3 shadow-sm p-4">
                        <div className="row g-3">
                            <div className="col-md-4">
                                <div className="text-muted small mb-1">Table Type</div>
                                <div className="fs-5 fw-semibold text-warning">Premium Poker Table</div>
                            </div>
                            <div className="col-md-4">
                                <div className="text-muted small mb-1">Session ID</div>
                                <div className="fs-5 fw-semibold font-monospace">PKR-2025-0719-8847</div>
                            </div>
                            <div className="col-md-4">
                                <div className="text-muted small mb-1">Status</div>
                                <span className="badge bg-success rounded-pill" style={{ width: '8px', height: '8px' }}></span>
                                <span className="text-success fw-medium ">Active Session</span>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Timer Card */}
                    <div className="col-lg-8">
                        <div className={`bg-white rounded-4 shadow-sm p-4 p-md-5 position-relative ${isWarningState ? 'warning-glow' : ''}`}>
                            <div className="text-center">
                                <div className="position-relative d-inline-block mb-4 mb-md-5">
                                    <svg className="w-100 h-auto" style={{ maxWidth: '300px' }} viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" stroke="#e9ecef" strokeWidth="2" fill="none" />
                                        <circle
                                            cx="50" cy="50" r="45"
                                            stroke={isWarningState ? "#dc3545" : "#ffc107"}
                                            strokeWidth="3"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={offset}
                                            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                                        />
                                    </svg>
                                    <div className="position-absolute top-50 start-50 translate-middle w-100 text-center">
                                        <div className="text-muted small mb-1">ELAPSED TIME</div>
                                        <div className="fs-4 fw-bold text-warning mb-3">{formatTime(elapsedSeconds)}</div>
                                        <div className="text-muted small mb-1">REMAINING TIME</div>
                                        <div className="fs-4 fw-bold">{formatTime(Math.max(0, remainingSeconds))}</div>
                                    </div>
                                </div>

                                <div className="bg-light rounded-3 p-3 mb-4">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="text-muted small">Session Progress</span>
                                        <span className={`small fw-medium ${isWarningState ? 'text-danger' : 'text-warning'}`}>
                                            {Math.round(progressPercent)}%
                                        </span>
                                    </div>
                                    <div className="progress" style={{ height: '6px' }}>
                                        <div
                                            className={`progress-bar ${isWarningState ? 'bg-danger' : 'bg-warning'}`}
                                            role="progressbar"
                                            style={{ width: `${progressPercent}%` }}
                                            aria-valuenow={progressPercent}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        ></div>
                                    </div>
                                </div>

                                <button
                                    className={`btn ${isExtended ? 'btn-success' : 'btn-warning'} px-4 py-2 px-md-5 py-md-3 fw-semibold d-flex align-items-center mx-auto`}
                                    onClick={extendSession}
                                    disabled={isExtended}
                                >
                                    <RiTimeLine className="me-2" />
                                    {isExtended ? 'Session Extended!' : 'Extend Session (+30 min)'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Side Cards */}
                    <div className="col-lg-4">
                        <div className="d-flex flex-column gap-4">
                            {/* Session Details */}
                            <div className="bg-white rounded-3 shadow-sm p-4">
                                <h3 className="fs-5 fw-semibold mb-3 d-flex align-items-center">
                                    <RiInformationLine className="text-warning me-2" />
                                    Session Details
                                </h3>
                                <div className="d-flex flex-column gap-2">
                                    <div className="d-flex justify-content-between">
                                        <span className="text-muted">Start Time</span>
                                        <span className="fw-medium font-monospace">14:34:24</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="text-muted">End Time</span>
                                        <span className="fw-medium font-monospace">16:00:00</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="text-muted">Total Duration</span>
                                        <span className="fw-medium font-monospace">2:00:00</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="text-muted">Rate</span>
                                        <span className="fw-semibold text-warning">$25/hour</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white rounded-3 shadow-sm p-4">
                                <h3 className="fs-5 fw-semibold mb-3 d-flex align-items-center">
                                    <RiSettings3Line className="text-warning me-2" />
                                    Quick Actions
                                </h3>
                                <div className="d-flex flex-column gap-2">
                                    <button className="btn btn-outline-secondary d-flex align-items-center justify-content-start py-2">
                                        <RiPauseLine className="me-2" />
                                        Pause Session
                                    </button>
                                    <button className="btn btn-outline-secondary d-flex align-items-center justify-content-start py-2">
                                        <RiStopLine className="me-2" />
                                        End Session
                                    </button>
                                  <Link to='/user/sessionhistory' className="text-decoration-none w-100 ">
                                    <button className="btn btn-outline-secondary d-flex align-items-center justify-content-start py-2 w-100">
                                        <RiHistoryLine className="me-2" />
                                        Session History
                                    </button>
                                  </Link>
                                </div>
                            </div>

                            {/* Current Charges */}
                            <div className="bg-white rounded-3 shadow-sm p-4">
                                <h3 className="fs-5 fw-semibold mb-3 d-flex align-items-center">
                                    <RiMoneyDollarCircleLine className="text-warning me-2" />
                                    Current Charges
                                </h3>
                                <div className="d-flex flex-column gap-2">
                                    <div className="d-flex justify-content-between">
                                        <span className="text-muted">Time Elapsed</span>
                                        <span className="fw-medium">1h 25m</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="text-muted">Hourly Rate</span>
                                        <span className="fw-medium">$25.00</span>
                                    </div>
                                    <div className="pt-2 border-top d-flex justify-content-between">
                                        <span className="fw-semibold text-warning">Total Cost</span>
                                        <span className="fw-bold text-warning fs-5">$35.42</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="position-fixed top-4 end-4 d-flex flex-column gap-3" style={{ zIndex: 1050 }}>
                {notifications.map(notification => (
                    <div
                        key={notification.id}
                        className={`bg-white shadow-lg rounded-3 p-3 border-start border-4 ${notification.type === 'warning' ? 'border-warning' :
                            notification.type === 'error' ? 'border-danger' : 'border-warning'
                            }`}
                        style={{ maxWidth: '320px' }}
                    >
                        <div className="d-flex align-items-center gap-3">
                            <div className="d-flex align-items-center justify-content-center">
                                <RiNotification3Fill className={
                                    notification.type === 'warning' ? 'text-warning' :
                                        notification.type === 'error' ? 'text-danger' : 'text-warning'
                                } />
                            </div>
                            <div className="flex-grow-1">
                                <p className="fw-medium mb-1">{notification.message}</p>
                                <p className="text-muted small mb-0">{notification.time}</p>
                            </div>
                            <button
                                className="btn btn-sm btn-link text-muted p-0"
                                onClick={() => removeNotification(notification.id)}
                            >
                                <RiCloseLine />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Custom CSS */}
            <style>
                {`
          .pulse-bell {
            animation: bellPulse 2s infinite;
          }
          
          @keyframes bellPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          
          .warning-glow {
            animation: warningGlow 1s ease-in-out infinite alternate;
          }
          
          @keyframes warningGlow {
            from { box-shadow: 0 0 10px rgba(220, 53, 69, 0.3); }
            to { box-shadow: 0 0 15px rgba(220, 53, 69, 0.5); }
          }

          .font-monospace {
            font-family: 'Courier New', Courier, monospace;
          }
        `}
            </style>
        </div>
    );
};

export default SessionTracker;







// import React, { useState, useEffect } from 'react';
// import {
//     RiNotification3Line,
//     RiNotification3Fill,
//     RiInformationLine,
//     RiSettings3Line,
//     RiMoneyDollarCircleLine,
//     RiPauseLine,
//     RiStopLine,
//     RiHistoryLine,
//     RiTimeLine,
//     RiCheckLine,
//     RiCloseLine
// } from 'react-icons/ri';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import axiosInstance from '../../../utils/axiosInstance';

// const SessionTracker = () => {
//     // Timer state
//     const [elapsedSeconds, setElapsedSeconds] = useState(0);
//     const [totalSeconds, setTotalSeconds] = useState(0);
//     const [isWarningState, setIsWarningState] = useState(false);
//     const [isExtended, setIsExtended] = useState(false);
//     const [sessionData, setSessionData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [sessionId, setSessionId] = useState(null);

//     // Notifications
//     const [notifications, setNotifications] = useState([]);
//     const [showNotificationDot, setShowNotificationDot] = useState(true);

//     // Format time helper
//     const formatTime = (seconds) => {
//         const hours = Math.floor(seconds / 3600);
//         const minutes = Math.floor((seconds % 3600) / 60);
//         const secs = seconds % 60;
//         return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     };

//     // Calculate progress
//     const progressPercent = totalSeconds > 0 ? (elapsedSeconds / totalSeconds) * 100 : 0;
//     const remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds);
//     const circumference = 2 * Math.PI * 45;
//     const offset = circumference - (progressPercent / 100) * circumference;

//     // Fetch active session on component mount
//     useEffect(() => {
//         fetchActiveSession();
//     }, []);

//     // Fetch active session
//     const fetchActiveSession = async () => {
//         try {
//             setIsLoading(true);
//             const response = await axiosInstance.get(`/sessions/active`);
            
//             if (response.data && response.data.length > 0) {
//                 const session = response.data[0];
//                 setSessionData(session);
//                 setSessionId(session.id);
                
//                 // Calculate elapsed time
//                 const startTime = new Date(session.start_time);
//                 const now = new Date();
//                 const elapsed = Math.floor((now - startTime) / 1000);
//                 setElapsedSeconds(elapsed);
                
//                 // Calculate total seconds based on duration or extended time
//                 const totalSecs = session.extended_minutes 
//                     ? (session.duration_minutes + session.extended_minutes) * 60
//                     : session.duration_minutes * 60;
                
//                 setTotalSeconds(totalSecs);
                
//                 showNotification('🎮 Session data loaded successfully!', 'info');
//             } else {
//                 showNotification('No active session found', 'info');
//             }
//         } catch (error) {
//             console.error('Error fetching active session:', error);
//             showNotification('Error loading session data', 'error');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Timer effect
//     useEffect(() => {
//         if (!sessionId) return;
        
//         const timer = setInterval(() => {
//             setElapsedSeconds(prev => {
//                 if (prev >= totalSeconds) {
//                     showNotification('🔔 Session has ended!', 'error');
//                     return prev;
//                 }
//                 return prev + 1;
//             });
//         }, 1000);

//         return () => clearInterval(timer);
//     }, [totalSeconds, sessionId]);

//     // Warning state effect
//     useEffect(() => {
//         if (remainingSeconds <= 300 && remainingSeconds > 0 && !isWarningState) {
//             setIsWarningState(true);
//             showNotification('⚠️ Warning: Only 5 minutes remaining!', 'warning');
//         }
//     }, [remainingSeconds, isWarningState]);

//     // Notification system
//     const showNotification = (message, type = 'info') => {
//         const id = Date.now();
//         const newNotification = {
//             id,
//             message,
//             type,
//             time: new Date().toLocaleTimeString()
//         };

//         setNotifications(prev => [...prev, newNotification]);
//         setShowNotificationDot(true);

//         // Auto remove after 5 seconds
//         setTimeout(() => {
//             removeNotification(id);
//         }, 5000);
//     };

//     const removeNotification = (id) => {
//         setNotifications(prev => prev.filter(n => n.id !== id));
//     };

//     // Extend session
//     const extendSession = async () => {
//         try {
//             const response = await axiosInstance.patch(
//                 `/sessions/${sessionId}/extend`,
//                 { extend_minutes: 30 }
//             );
            
//             if (response.data) {
//                 setTotalSeconds(prev => prev + 1800);
//                 setIsExtended(true);
//                 showNotification('✅ Session extended by 30 minutes!', 'info');

//                 setTimeout(() => {
//                     setIsExtended(false);
//                 }, 3000);
//             }
//         } catch (error) {
//             console.error('Error extending session:', error);
//             showNotification('Error extending session', 'error');
//         }
//     };

//     // Pause session
//     const pauseSession = async () => {
//         try {
//             const response = await axiosInstance.patch(`/sessions/${sessionId}/pause`);
            
//             if (response.data) {
//                 showNotification('⏸️ Session paused', 'info');
//                 // You might want to update local state to reflect paused status
//             }
//         } catch (error) {
//             console.error('Error pausing session:', error);
//             showNotification('Error pausing session', 'error');
//         }
//     };

//     // End session
//     const endSession = async () => {
//         try {
//             const response = await axiosInstance.patch(`/sessions/${sessionId}/end`);
            
//             if (response.data) {
//                 showNotification('🛑 Session ended', 'info');
//                 // Reset or redirect after ending session
//                 setSessionId(null);
//                 setSessionData(null);
//             }
//         } catch (error) {
//             console.error('Error ending session:', error);
//             showNotification('Error ending session', 'error');
//         }
//     };

//     // Calculate charges
//     const calculateCharges = () => {
//         if (!sessionData) return { timeElapsed: '0h 0m', hourlyRate: '$0.00', totalCost: '$0.00' };
        
//         const hoursElapsed = elapsedSeconds / 3600;
//         const hourlyRate = sessionData.hourly_rate || 25;
//         const totalCost = hoursElapsed * hourlyRate;
        
//         const hours = Math.floor(elapsedSeconds / 3600);
//         const minutes = Math.floor((elapsedSeconds % 3600) / 60);
        
//         return {
//             timeElapsed: `${hours}h ${minutes}m`,
//             hourlyRate: `$${hourlyRate.toFixed(2)}`,
//             totalCost: `$${totalCost.toFixed(2)}`
//         };
//     };

//     const charges = calculateCharges();

//     if (isLoading) {
//         return (
//             <div className="p-3 d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
//                 <div className="spinner-border text-warning" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//             </div>
//         );
//     }

//     if (!sessionData) {
//         return (
//             <div className="p-3">
//                 <div className="alert alert-info">
//                     <h4>No Active Session</h4>
//                     <p>There is no active session at the moment.</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="p-3">
//             {/* Navbar */}
//             <nav className="">
//                 <div className="">
//                     <div className="d-flex justify-content-between align-items-center">
//                         <div className="d-flex align-items-center gap-3">
//                             <h1 className="fs-3 fw-bold text-dark">Session Tracker</h1>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             {/* Main Content */}
//             <div className="mt-2">
//                 {/* Session Info Card */}
//                 <div className="mb-4">
//                     <div className="bg-white rounded-3 shadow-sm p-4">
//                         <div className="row g-3">
//                             <div className="col-md-4">
//                                 <div className="text-muted small mb-1">Table Type</div>
//                                 <div className="fs-5 fw-semibold text-warning">{sessionData.table_type || 'Premium Poker Table'}</div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="text-muted small mb-1">Session ID</div>
//                                 <div className="fs-5 fw-semibold font-monospace">{sessionData.session_code || 'PKR-2025-0719-8847'}</div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="text-muted small mb-1">Status</div>
//                                 <span className="badge bg-success rounded-pill" style={{ width: '8px', height: '8px' }}></span>
//                                 <span className="text-success fw-medium ">Active Session</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="row g-4">
//                     {/* Timer Card */}
//                     <div className="col-lg-8">
//                         <div className={`bg-white rounded-4 shadow-sm p-4 p-md-5 position-relative ${isWarningState ? 'warning-glow' : ''}`}>
//                             <div className="text-center">
//                                 <div className="position-relative d-inline-block mb-4 mb-md-5">
//                                     <svg className="w-100 h-auto" style={{ maxWidth: '300px' }} viewBox="0 0 100 100">
//                                         <circle cx="50" cy="50" r="45" stroke="#e9ecef" strokeWidth="2" fill="none" />
//                                         <circle
//                                             cx="50" cy="50" r="45"
//                                             stroke={isWarningState ? "#dc3545" : "#ffc107"}
//                                             strokeWidth="3"
//                                             fill="none"
//                                             strokeLinecap="round"
//                                             strokeDasharray={circumference}
//                                             strokeDashoffset={offset}
//                                             style={{ transition: 'stroke-dashoffset 0.3s ease' }}
//                                         />
//                                     </svg>
//                                     <div className="position-absolute top-50 start-50 translate-middle w-100 text-center">
//                                         <div className="text-muted small mb-1">ELAPSED TIME</div>
//                                         <div className="fs-4 fw-bold text-warning mb-3">{formatTime(elapsedSeconds)}</div>
//                                         <div className="text-muted small mb-1">REMAINING TIME</div>
//                                         <div className="fs-4 fw-bold">{formatTime(Math.max(0, remainingSeconds))}</div>
//                                     </div>
//                                 </div>

//                                 <div className="bg-light rounded-3 p-3 mb-4">
//                                     <div className="d-flex justify-content-between align-items-center mb-2">
//                                         <span className="text-muted small">Session Progress</span>
//                                         <span className={`small fw-medium ${isWarningState ? 'text-danger' : 'text-warning'}`}>
//                                             {Math.round(progressPercent)}%
//                                         </span>
//                                     </div>
//                                     <div className="progress" style={{ height: '6px' }}>
//                                         <div
//                                             className={`progress-bar ${isWarningState ? 'bg-danger' : 'bg-warning'}`}
//                                             role="progressbar"
//                                             style={{ width: `${progressPercent}%` }}
//                                             aria-valuenow={progressPercent}
//                                             aria-valuemin="0"
//                                             aria-valuemax="100"
//                                         ></div>
//                                     </div>
//                                 </div>

//                                 <button
//                                     className={`btn ${isExtended ? 'btn-success' : 'btn-warning'} px-4 py-2 px-md-5 py-md-3 fw-semibold d-flex align-items-center mx-auto`}
//                                     onClick={extendSession}
//                                     disabled={isExtended}
//                                 >
//                                     <RiTimeLine className="me-2" />
//                                     {isExtended ? 'Session Extended!' : 'Extend Session (+30 min)'}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Side Cards */}
//                     <div className="col-lg-4">
//                         <div className="d-flex flex-column gap-4">
//                             {/* Session Details */}
//                             <div className="bg-white rounded-3 shadow-sm p-4">
//                                 <h3 className="fs-5 fw-semibold mb-3 d-flex align-items-center">
//                                     <RiInformationLine className="text-warning me-2" />
//                                     Session Details
//                                 </h3>
//                                 <div className="d-flex flex-column gap-2">
//                                     <div className="d-flex justify-content-between">
//                                         <span className="text-muted">Start Time</span>
//                                         <span className="fw-medium font-monospace">
//                                             {new Date(sessionData.start_time).toLocaleTimeString()}
//                                         </span>
//                                     </div>
//                                     <div className="d-flex justify-content-between">
//                                         <span className="text-muted">End Time</span>
//                                         <span className="fw-medium font-monospace">
//                                             {sessionData.estimated_end_time 
//                                                 ? new Date(sessionData.estimated_end_time).toLocaleTimeString()
//                                                 : 'Calculating...'}
//                                         </span>
//                                     </div>
//                                     <div className="d-flex justify-content-between">
//                                         <span className="text-muted">Total Duration</span>
//                                         <span className="fw-medium font-monospace">
//                                             {sessionData.duration_minutes ? 
//                                                 `${Math.floor(sessionData.duration_minutes / 60)}:${(sessionData.duration_minutes % 60).toString().padStart(2, '0')}:00` 
//                                                 : '2:00:00'}
//                                         </span>
//                                     </div>
//                                     <div className="d-flex justify-content-between">
//                                         <span className="text-muted">Rate</span>
//                                         <span className="fw-semibold text-warning">
//                                             ${sessionData.hourly_rate || 25}/hour
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Quick Actions */}
//                             <div className="bg-white rounded-3 shadow-sm p-4">
//                                 <h3 className="fs-5 fw-semibold mb-3 d-flex align-items-center">
//                                     <RiSettings3Line className="text-warning me-2" />
//                                     Quick Actions
//                                 </h3>
//                                 <div className="d-flex flex-column gap-2">
//                                     <button 
//                                         className="btn btn-outline-secondary d-flex align-items-center justify-content-start py-2"
//                                         onClick={pauseSession}
//                                     >
//                                         <RiPauseLine className="me-2" />
//                                         Pause Session
//                                     </button>
//                                     <button 
//                                         className="btn btn-outline-secondary d-flex align-items-center justify-content-start py-2"
//                                         onClick={endSession}
//                                     >
//                                         <RiStopLine className="me-2" />
//                                         End Session
//                                     </button>
//                                     <Link to='/user/sessionhistory' className="text-decoration-none w-100 ">
//                                         <button className="btn btn-outline-secondary d-flex align-items-center justify-content-start py-2 w-100">
//                                             <RiHistoryLine className="me-2" />
//                                             Session History
//                                         </button>
//                                     </Link>
//                                 </div>
//                             </div>

//                             {/* Current Charges */}
//                             <div className="bg-white rounded-3 shadow-sm p-4">
//                                 <h3 className="fs-5 fw-semibold mb-3 d-flex align-items-center">
//                                     <RiMoneyDollarCircleLine className="text-warning me-2" />
//                                     Current Charges
//                                 </h3>
//                                 <div className="d-flex flex-column gap-2">
//                                     <div className="d-flex justify-content-between">
//                                         <span className="text-muted">Time Elapsed</span>
//                                         <span className="fw-medium">{charges.timeElapsed}</span>
//                                     </div>
//                                     <div className="d-flex justify-content-between">
//                                         <span className="text-muted">Hourly Rate</span>
//                                         <span className="fw-medium">{charges.hourlyRate}</span>
//                                     </div>
//                                     <div className="pt-2 border-top d-flex justify-content-between">
//                                         <span className="fw-semibold text-warning">Total Cost</span>
//                                         <span className="fw-bold text-warning fs-5">{charges.totalCost}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Notifications */}
//             <div className="position-fixed top-4 end-4 d-flex flex-column gap-3" style={{ zIndex: 1050 }}>
//                 {notifications.map(notification => (
//                     <div
//                         key={notification.id}
//                         className={`bg-white shadow-lg rounded-3 p-3 border-start border-4 ${notification.type === 'warning' ? 'border-warning' :
//                             notification.type === 'error' ? 'border-danger' : 'border-warning'
//                             }`}
//                         style={{ maxWidth: '320px' }}
//                     >
//                         <div className="d-flex align-items-center gap-3">
//                             <div className="d-flex align-items-center justify-content-center">
//                                 <RiNotification3Fill className={
//                                     notification.type === 'warning' ? 'text-warning' :
//                                         notification.type === 'error' ? 'text-danger' : 'text-warning'
//                                 } />
//                             </div>
//                             <div className="flex-grow-1">
//                                 <p className="fw-medium mb-1">{notification.message}</p>
//                                 <p className="text-muted small mb-0">{notification.time}</p>
//                             </div>
//                             <button
//                                 className="btn btn-sm btn-link text-muted p-0"
//                                 onClick={() => removeNotification(notification.id)}
//                             >
//                                 <RiCloseLine />
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Custom CSS */}
//             <style>
//                 {`
//           .pulse-bell {
//             animation: bellPulse 2s infinite;
//           }
          
//           @keyframes bellPulse {
//             0%, 100% { transform: scale(1); }
//             50% { transform: scale(1.1); }
//           }
          
//           .warning-glow {
//             animation: warningGlow 1s ease-in-out infinite alternate;
//           }
          
//           @keyframes warningGlow {
//             from { box-shadow: 0 0 10px rgba(220, 53, 69, 0.3); }
//             to { box-shadow: 0 0 15px rgba(220, 53, 69, 0.5); }
//           }

//           .font-monospace {
//             font-family: 'Courier New', Courier, monospace;
//           }
//         `}
//             </style>
//         </div>
//     );
// };

// export default SessionTracker;