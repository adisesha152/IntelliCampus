import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './Card';
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  Download, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Filter,
  ArrowUpRight,
  Receipt
} from 'lucide-react';
import Button from './Button';
import Layout from './Layout';

const StudentFees = () => {
  const [activeSemester, setActiveSemester] = useState('Fall 2023');
  const [expandedPayment, setExpandedPayment] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Sample semesters data
  const semesters = [
    'Fall 2023',
    'Spring 2023',
    'Fall 2022'
  ];
  
  // Sample fee structure data
  const feeStructure = {
    'Fall 2023': {
      tuition: 8500,
      registrationFee: 250,
      libraryFee: 150,
      technologyFee: 300,
      recreationFee: 120,
      healthInsurance: 800,
      total: 10120,
      dueDate: '2023-08-15',
      paymentStatus: 'partial',
      amountPaid: 5060,
      scholarship: 0,
      balance: 5060,
      installments: [
        { 
          id: 1, 
          dueDate: '2023-08-15', 
          amount: 5060, 
          status: 'paid', 
          paidOn: '2023-08-10',
          transactionId: 'TXN123456'
        },
        { 
          id: 2, 
          dueDate: '2023-10-15', 
          amount: 5060, 
          status: 'pending',
          paidOn: null,
          transactionId: null
        }
      ]
    },
    'Spring 2023': {
      tuition: 8500,
      registrationFee: 250,
      libraryFee: 150,
      technologyFee: 300,
      recreationFee: 120,
      healthInsurance: 800,
      total: 10120,
      dueDate: '2023-01-15',
      paymentStatus: 'paid',
      amountPaid: 10120,
      scholarship: 2000,
      balance: 0,
      installments: [
        { 
          id: 1, 
          dueDate: '2023-01-15', 
          amount: 4060, 
          status: 'paid', 
          paidOn: '2023-01-10',
          transactionId: 'TXN987654'
        },
        { 
          id: 2, 
          dueDate: '2023-03-15', 
          amount: 4060, 
          status: 'paid',
          paidOn: '2023-03-12',
          transactionId: 'TXN876543'
        }
      ]
    },
    'Fall 2022': {
      tuition: 8200,
      registrationFee: 250,
      libraryFee: 150,
      technologyFee: 300,
      recreationFee: 120,
      healthInsurance: 750,
      total: 9770,
      dueDate: '2022-08-15',
      paymentStatus: 'paid',
      amountPaid: 9770,
      scholarship: 1500,
      balance: 0,
      installments: [
        { 
          id: 1, 
          dueDate: '2022-08-15', 
          amount: 4135, 
          status: 'paid', 
          paidOn: '2022-08-10',
          transactionId: 'TXN654321'
        },
        { 
          id: 2, 
          dueDate: '2022-10-15', 
          amount: 4135, 
          status: 'paid',
          paidOn: '2022-10-12',
          transactionId: 'TXN543210'
        }
      ]
    }
  };
  
  // Transaction History - Combining all installments from all semesters
  const transactionHistory = Object.entries(feeStructure).flatMap(([semester, data]) => {
    return data.installments.map(installment => ({
      ...installment,
      semester,
      type: 'Tuition & Fees',
    }));
  }).filter(tx => tx.status === 'paid').sort((a, b) => new Date(b.paidOn) - new Date(a.paidOn));
  
  // Sample upcoming payments
  const upcomingPayments = Object.entries(feeStructure).flatMap(([semester, data]) => {
    return data.installments.map(installment => ({
      ...installment,
      semester,
      type: 'Tuition & Fees',
    }));
  }).filter(tx => tx.status === 'pending').sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  
  // Current selected semester fees
  const currentFees = feeStructure[activeSemester];
  
  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Helper function to get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'partial':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };
  
  // Helper function to get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4" />;
      case 'partial':
        return <DollarSign className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  // Calculate if payment is overdue
  const isOverdue = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    return due < today;
  };
  
  // Calculate days remaining until due
  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">Tuition & Fees</h1>
          
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="flex items-center gap-1"
              >
                <Filter className="h-4 w-4 mr-1" />
                {activeSemester}
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
              
              {showFilterMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-slate-200">
                  {semesters.map(semester => (
                    <button
                      key={semester}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${
                        activeSemester === semester ? 'bg-blue-50 text-blue-600' : ''
                      }`}
                      onClick={() => {
                        setActiveSemester(semester);
                        setShowFilterMenu(false);
                      }}
                    >
                      {semester}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4 mr-1" />
              Download Statement
            </Button>
            
            <Button size="sm" className="flex items-center gap-1">
              <CreditCard className="h-4 w-4 mr-1" />
              Make Payment
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Fee Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Fee Summary Card */}
            <Card>
              <CardHeader className="p-6 pb-3">
                <CardTitle>Fee Summary</CardTitle>
                <CardDescription>{activeSemester} Semester</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-3">
                <div className="bg-slate-50 p-4 rounded-md mb-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <div>
                      <p className="text-sm text-slate-500">Total Fees</p>
                      <p className="text-3xl font-bold">{formatCurrency(currentFees.total)}</p>
                    </div>
                    
                    <div className="mt-2 md:mt-0 flex items-center gap-6">
                      <div>
                        <p className="text-sm text-slate-500">Amount Paid</p>
                        <p className="text-xl font-medium text-green-600">{formatCurrency(currentFees.amountPaid)}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-slate-500">Balance Due</p>
                        <p className="text-xl font-medium text-red-600">{formatCurrency(currentFees.balance)}</p>
                      </div>
                      
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(currentFees.paymentStatus)}`}>
                          {getStatusIcon(currentFees.paymentStatus)}
                          <span className="ml-1 capitalize">{currentFees.paymentStatus}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(currentFees.amountPaid / currentFees.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>{Math.round((currentFees.amountPaid / currentFees.total) * 100)}% Paid</span>
                    <span>Due: {formatDate(currentFees.dueDate)}</span>
                  </div>
                </div>
                
                <h3 className="text-md font-semibold mb-4">Fee Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm">Tuition</span>
                    <span className="font-medium">{formatCurrency(currentFees.tuition)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm">Registration Fee</span>
                    <span className="font-medium">{formatCurrency(currentFees.registrationFee)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm">Library Fee</span>
                    <span className="font-medium">{formatCurrency(currentFees.libraryFee)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm">Technology Fee</span>
                    <span className="font-medium">{formatCurrency(currentFees.technologyFee)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm">Recreation Fee</span>
                    <span className="font-medium">{formatCurrency(currentFees.recreationFee)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm">Health Insurance</span>
                    <span className="font-medium">{formatCurrency(currentFees.healthInsurance)}</span>
                  </div>
                  {currentFees.scholarship > 0 && (
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-green-600">Scholarship/Financial Aid</span>
                      <span className="font-medium text-green-600">-{formatCurrency(currentFees.scholarship)}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-3 font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(currentFees.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Payment Schedule Card */}
            <Card>
              <CardHeader className="p-6 pb-3">
                <CardTitle>Payment Schedule</CardTitle>
                <CardDescription>Installment plan for {activeSemester}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-3">
                <div className="space-y-4">
                  {currentFees.installments.map((installment) => (
                    <div 
                      key={installment.id} 
                      className="border rounded-lg overflow-hidden"
                    >
                      <div 
                        className={`p-4 flex flex-wrap justify-between items-center cursor-pointer ${
                          expandedPayment === installment.id ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'
                        }`}
                        onClick={() => setExpandedPayment(
                          expandedPayment === installment.id ? null : installment.id
                        )}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-full ${
                            installment.status === 'paid' ? 'bg-green-100 text-green-700' : 
                            isOverdue(installment.dueDate) ? 'bg-red-100 text-red-700' : 
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {installment.status === 'paid' ? 
                              <CheckCircle className="h-5 w-5" /> : 
                              <Calendar className="h-5 w-5" />
                            }
                          </div>
                          <div>
                            <p className="font-medium">Installment {installment.id} of {currentFees.installments.length}</p>
                            <p className="text-sm text-slate-500">
                              Due: {formatDate(installment.dueDate)}
                              {installment.status !== 'paid' && (
                                <span className={`ml-2 ${
                                  isOverdue(installment.dueDate) ? 'text-red-600' : 
                                  getDaysRemaining(installment.dueDate) <= 7 ? 'text-yellow-600' : 'text-slate-500'
                                }`}>
                                  {isOverdue(installment.dueDate) ? 
                                    '(Overdue)' : 
                                    `(${getDaysRemaining(installment.dueDate)} days left)`
                                  }
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 mt-3 sm:mt-0">
                          <div>
                            <p className="text-xl font-semibold">{formatCurrency(installment.amount)}</p>
                          </div>
                          <div>
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              installment.status === 'paid' ? 'bg-green-100 text-green-700' : 
                              isOverdue(installment.dueDate) ? 'bg-red-100 text-red-700' : 
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {installment.status === 'paid' ? 
                                'Paid' : 
                                isOverdue(installment.dueDate) ? 'Overdue' : 'Upcoming'
                              }
                            </span>
                          </div>
                          <div>
                            {expandedPayment === installment.id ? 
                              <ChevronUp className="h-5 w-5 text-slate-400" /> : 
                              <ChevronDown className="h-5 w-5 text-slate-400" />
                            }
                          </div>
                        </div>
                      </div>
                      
                      {expandedPayment === installment.id && (
                        <div className="p-4 bg-slate-50 border-t border-slate-200">
                          {installment.status === 'paid' ? (
                            <div className="space-y-3">
                              <h4 className="font-medium mb-2 text-green-700">Payment Details</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="bg-white p-3 rounded border border-slate-200">
                                  <p className="text-xs text-slate-500">Payment Date</p>
                                  <p className="font-medium">{formatDate(installment.paidOn)}</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-slate-200">
                                  <p className="text-xs text-slate-500">Transaction ID</p>
                                  <p className="font-medium">{installment.transactionId}</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-slate-200">
                                  <p className="text-xs text-slate-500">Amount Paid</p>
                                  <p className="font-medium">{formatCurrency(installment.amount)}</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-slate-200">
                                  <p className="text-xs text-slate-500">Payment Method</p>
                                  <p className="font-medium">Credit Card (ending in 4321)</p>
                                </div>
                              </div>
                              <div className="flex justify-end mt-3">
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                  <Download className="h-4 w-4" />
                                  Download Receipt
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <h4 className="font-medium mb-2 text-slate-700">Payment Instructions</h4>
                              <p className="text-sm text-slate-600">
                                This installment of {formatCurrency(installment.amount)} is due on {formatDate(installment.dueDate)}.
                                Please make your payment before the due date to avoid late fees.
                              </p>
                              
                              <div className="flex justify-end mt-3">
                                <Button size="sm" className="flex items-center gap-1">
                                  <CreditCard className="h-4 w-4" />
                                  Pay Now
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Payment History and Other Info */}
          <div className="space-y-6">
            {/* Payment Summary Card */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Payment Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                      <span className="text-sm">Total Charges</span>
                      <span className="font-medium">{formatCurrency(currentFees.total)}</span>
                    </div>
                    {currentFees.scholarship > 0 && (
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-md">
                        <span className="text-sm text-green-700">Financial Aid</span>
                        <span className="font-medium text-green-700">-{formatCurrency(currentFees.scholarship)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                      <span className="text-sm text-blue-700">Amount Paid</span>
                      <span className="font-medium text-blue-700">{formatCurrency(currentFees.amountPaid)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-md">
                      <span className="text-sm text-red-700">Balance Due</span>
                      <span className="font-medium text-red-700">{formatCurrency(currentFees.balance)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex">
                  <Button className="w-full flex items-center justify-center gap-1">
                    <CreditCard className="h-4 w-4" />
                    Make Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Upcoming Payments Card */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex items-center">
                  <Calendar className="h-5 w-5 text-slate-500 mr-2" />
                  Upcoming Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {upcomingPayments.length > 0 ? (
                    upcomingPayments.slice(0, 3).map((payment) => (
                      <div 
                        key={`${payment.semester}-${payment.id}`} 
                        className="p-3 bg-slate-50 rounded-lg border border-slate-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">{payment.semester}</p>
                            <p className="text-xs text-slate-500">Due: {formatDate(payment.dueDate)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                              isOverdue(payment.dueDate) ? 'bg-red-100 text-red-700' : 
                              getDaysRemaining(payment.dueDate) <= 7 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {isOverdue(payment.dueDate) ? 'Overdue' : 
                               getDaysRemaining(payment.dueDate) <= 7 ? 'Due Soon' : 
                               `${getDaysRemaining(payment.dueDate)} days left`}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-4 text-slate-500">
                      <p className="text-sm">No upcoming payments</p>
                    </div>
                  )}
                </div>
                
                {upcomingPayments.length > 0 && (
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View All Payments
                  </Button>
                )}
              </CardContent>
            </Card>
            
            {/* Recent Transactions Card */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex items-center">
                  <Receipt className="h-5 w-5 text-slate-500 mr-2" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {transactionHistory.slice(0, 3).map((transaction, index) => (
                    <div 
                      key={index}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{transaction.type}</p>
                          <p className="text-xs text-slate-500">{transaction.semester}</p>
                          <p className="text-xs text-slate-500">Paid on: {formatDate(transaction.paidOn)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{formatCurrency(transaction.amount)}</p>
                          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 mt-1">
                            Completed
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-3">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>
            
            {/* Payment Methods Card */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex items-center">
                  <CreditCard className="h-5 w-5 text-slate-500 mr-2" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-blue-500 h-8 w-12 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="font-medium text-sm">Visa ending in 4321</p>
                        <p className="text-xs text-slate-500">Expires 05/2025</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                      Default
                    </span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Manage Payment Methods
                </Button>
              </CardContent>
            </Card>
            
            {/* Support Card */}
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-sm font-medium mb-2">Need help with your payment?</h3>
                  <p className="text-xs text-slate-500 mb-3">
                    Contact the finance office for assistance with payment plans, 
                    financial aid, or any billing questions.
                  </p>
                  <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
                    <ArrowUpRight className="h-4 w-4" />
                    Contact Finance Office
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentFees;
