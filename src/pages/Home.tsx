import axios from 'axios';
import { useEffect, useState } from 'react';
import "./home.css";
interface Job {
    _id: string;
    role: string;
    company: string;
    status: string;
    link: string;
    date: string;
}

interface JobDetailsProps {
    job: Job;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, newStatus: string) => void;
}

function JobDetails({ job, onDelete, onStatusChange }: JobDetailsProps) {
    return (

        <div className="job-card">
            <p>Role: <b>{job.role}</b> </p>
            <p>Company: <b>{job.company}</b></p>
            <p>Status: {job.status}</p>
            <p>Link: <a href={job.link} target="_blank" rel="noopener noreferrer">View Link</a></p>
            <p>Date: {job.date}</p>
            <select onChange={(e) => onStatusChange(job._id, e.target.value)} value={job.status}>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
            </select>
            <button onClick={() => onDelete(job._id)}>Delete</button>
        </div>
    );
}

export default function Home() {
    const [data, setData] = useState<Job[]>([]);
    const [filter, setFilter] = useState('');

    const fetchJobs = async () => {
        try {
            const res = await axios.get('https://job-backend-1y89.onrender.com/api/getjobs');
            setData(res.data);
        } catch (err) {
            console.error('Error fetching jobs', err);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`https://job-backend-1y89.onrender.com/api/deletejob/${id}`);
            fetchJobs();
        } catch (err) {
            console.error('Error deleting job', err);
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            await axios.put(`https://job-backend-1y89.onrender.com/api/updatejob/${id}`, { status: newStatus });
            fetchJobs();
        } catch (err) {
            console.error('Error updating status', err);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const filteredData = filter ? data.filter(job => job.status === filter) : data;

    return (
        <main>
            <div className='select'> <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                <option value="">All</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
            </select></div>
           <div className="job-list">
           {filteredData.map(job => (
                <JobDetails
                    key={job._id}
                    job={job}
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                />
            ))}
           </div>
            
        </main>
    );
}