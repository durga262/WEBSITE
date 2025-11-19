import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { LogOut, BarChart3 } from 'lucide-react';
// Assuming you reuse or import a simplified version of the list for approval
import TaskListForApproval from '@/components/TaskListForApproval'; 

import logoUrl from '@assets/Screenshot 2025-10-15 183825_1762839858915.png';

// Import types and data structures you need
import type { Task, ShiftType } from '@/types/task';

// Mock data/constants for structure
const employeeData = JSON.parse(
    localStorage.getItem("employeeData") ||
    '{"employeeId":"","employeeName":"Guest"}'
);
const selectedShift: ShiftType = '8hr'; // You'd likely fetch/pass this
const tasks: Task[] = []; // You'd fetch the tasks needing approval

export default function ApprovalPage() {
    const [, setLocation] = useLocation();
    const [showAnalytics, setShowAnalytics] = useState(false);

    // TODO: Implement logic to fetch tasks that need approval

    const handleApprove = () => {
        // 1. Logic to send approval request to the backend
        alert("Tasks approved!"); 
        // 2. Optionally redirect after approval
        // setLocation("/tracker"); 
    };
    
    const handleLogout = () => {
        // Assuming a simpler logout for now, or use GSAP like TrackerPage
        setLocation("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-blue-500/5 blur-3xl rounded-full top-0 right-0 animate-pulse" />
                <div
                    className="absolute w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full bottom-0 left-0 animate-pulse"
                    style={{ animationDelay: "1.5s" }}
                />
            </div>

            <div className="relative z-10 approval-container">

                {/* Header (Same as TrackerPage but simplified actions) */}
                <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl border-b border-blue-500/30">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">

                        {/* Logo and Employee Info */}
                        <div className="flex items-center gap-4">
                            <img src={logoUrl} alt="Knockturn" className="h-10" />
                            <div className="hidden sm:block">
                                <p className="text-xs text-muted-foreground">Employee</p>
                                <p className="text-sm font-semibold">{employeeData.employeeName}</p>
                                <p className="text-xs text-blue-400 font-mono">
                                    ID: {employeeData.employeeId}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outline" size="sm"
                                onClick={() => setShowAnalytics(prev => !prev)}>
                                <BarChart3 className="h-4 w-4 mr-2" />
                                {showAnalytics ? "Hide" : "Show"} Analytics
                            </Button>
                            <Button variant="outline" size="sm" onClick={handleLogout}>
                                <LogOut className="h-4 w-4 mr-2" /> Logout
                            </Button>
                        </div>
                    </div>
                </header>
                {/* End Header */}

                <main className="container mx-auto px-6 py-8 space-y-6">
                    <h1 className="text-3xl font-extrabold text-white mb-6">Timesheet Approval</h1>

                    {/* Shift Display - You need to determine how to display the shift/date info for the approved timesheet */}
                    <div className="bg-blue-900/20 p-4 rounded-lg text-center">
                        <p className="text-lg text-blue-300">Shift Type: **{selectedShift.toUpperCase()}**</p>
                        {/* Add Date and other relevant info here */}
                    </div>

                    {/* Tasks List for Approval */}
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Tasks to Approve</h2>
                        {/* You'll need a new component or a modified TaskList that shows read-only data, including:
                            - Task Title/Project
                            - Time Entries (start/end)
                            - Total Time
                            - Completion Status/Percent
                        */}
                        <TaskListForApproval tasks={tasks} /> 
                    </div>

                    {showAnalytics && (
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-4">Analytics</h2>
                            {/* Assuming AnalyticsDashboard works with the tasks data */}
                            <AnalyticsDashboard tasks={tasks} /> 
                        </div>
                    )}
                    
                    {/* Approve Button */}
                    <div className="flex justify-center pt-8">
                        <Button
                            onClick={handleApprove}
                            className="bg-green-600 hover:bg-green-500 px-12 py-6 text-lg"
                        >
                            Approve Timesheet
                        </Button>
                    </div>
                </main>
            </div>
        </div>
    );
}