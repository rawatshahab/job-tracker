import axios from 'axios';
import { useState } from 'react';
import "./addjob.css";

export default function Addjob() {

    const [newJob, setNewJob] = useState({
        role: '',
        company: '',
        link: '',
        date: new Date().toISOString().split('T')[0],
        status: 'applied',
    });
    const handleAddJob = async () => {
        try {
            await axios.post('https://job-backend-1y89.onrender.com/api/addjob', newJob);
            setNewJob({ role: '', company: '', link: '', date: new Date().toISOString().split('T')[0], status: 'applied' });
        } catch (err) {
            console.error('Error adding job', err);
        }
    };
    return (
        <main>
            <h1>Job Tracker</h1>
            <section>
                <h2>Add a New Job</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddJob();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Role"
                        value={newJob.role}
                        onChange={(e) => setNewJob({ ...newJob, role: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Company"
                        value={newJob.company}
                        onChange={(e) => setNewJob({ ...newJob, company: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) })}
                        required
                    />
                    <input
                        type="url"
                        placeholder="Link"
                        value={newJob.link}
                        onChange={(e) => setNewJob({ ...newJob, link: e.target.value })}
                        required
                    />
                    <input
                        type="date"
                        placeholder="Date"
                        value={newJob.date}
                        onChange={(e) => setNewJob({ ...newJob, date: e.target.value })}
                        required
                    />
                    <select
                        value={newJob.status}
                        onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
                    >
                        <option value="applied">Applied</option>
                        <option value="interview">Interview</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <button type="submit">Add Job</button>
                </form>
            </section>
        </main>
    );
}
