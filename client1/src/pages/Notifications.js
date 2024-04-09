import React from 'react';
import Layout from '../components/Layout';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setUser } from '../redux/userSlice';

function Notifications() {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const markallAsSeen = async()=>{
        try {
            dispatch (showLoading());
            const response = await axios.post("/api/user/mark-all-notifications-as-seen", {userId:user._id},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch (hideLoading());
    
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(setUser(response.data.data));
            } else {
                toast.error(response.data.message);
            }
        }catch (error) {
            dispatch(hideLoading());
           toast.error("something went wrong");
        }
    }
    const deleteAll = async()=>{
        try {
            dispatch (showLoading());
            const response = await axios.post("/api/user/delete-all-notifications", {userId:user._id} , {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
           });
            dispatch (hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(setUser(response.data.data));
            } else {
                toast.error(response.data.message);
            }
        }catch (error) {
            dispatch(hideLoading());
           toast.error("something went wrong");
        }
    }

    return (
        <Layout>
            <h1 className="page-title">Notifications</h1>
            <Tabs>
                <Tabs.TabPane tab='Unseen' key={0}>
                    <div className="d-flex justify-content-end">
                        <h5 className="anchor" onClick={()=>markallAsSeen()}>Mark all as seen</h5>
                    </div>
                    {user?.unseenNotifications.map((notification) => (
                        <div className="card p-2" onClick={()=>navigate(notification.onClickPath)}>
                            <div className="card-text">{notification.message}</div>
                        </div>
                    ))}
                </Tabs.TabPane>
                <Tabs.TabPane tab='seen' key={1}>
                    <div className="d-flex justify-content-end">
                        <h5 className="anchor" onClick={()=>deleteAll()}>Delete All</h5>
                    </div>
                    {user?.seenNotification.map((notification) => (
                        <div className="card p-2" onClick={()=>navigate(notification.onClickPath)}>
                            <div className="card-text">{notification.message}</div>
                        </div>
                        ))}
                </Tabs.TabPane>
            </Tabs>
        </Layout>

    )
}

export default Notifications