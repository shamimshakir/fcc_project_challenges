import {useState, useEffect} from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import TaskModal from "./TaskModal";

function Views(){
    const taskList = [
        {
            task: "Complete crud operation with react",
            status: false
        },
        {
            task: "Research on context api",
            status: false
        }
    ];
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const modalClose = () => {
        setShowModal(false);
        setEditTask(null);
    };
    const modalShow = () => setShowModal(true);
    const deleteTask = (id) => {
        let filterd = tasks.filter((task, index) => {
            return index !== id;
        });
        setTasks(filterd);
    }
    const setEditMode = (id) => {
        modalShow();
        setEditTask(id);
    }

    useEffect(() => {
        setTasks(taskList);
    },[])
    return <div className="views">
        <Container>
            <Row>
                <Col lg={{span: 10, offset: 1}}>
                    <div className="card mt-3">
                        <div className="card-header d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Total Tasks</h3>
                            <button onClick={modalShow} type="button" className="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">
                                Add Task
                            </button>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Task</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {tasks.map((task, index) => {
                                    return <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{task.task}</td>
                                        <td>{task.status ? "Completed" : "Not complete"}</td>
                                        <td>
                                            <button onClick={() => setEditMode(index)} type="button" className="btn btn-primary" data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal" className="btn btn-primary btn-sm">Edit</button>
                                            <button onClick={() => deleteTask(index)} style={{marginLeft:"5px"}} className="btn btn-danger btn-sm">Delete</button>
                                        </td>
                                    </tr>
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Col>
            </Row>
            {showModal && <TaskModal
                showModal={showModal}
                modalClose={modalClose}
                modalShow={modalShow}
                setTasks={setTasks}
                tasks={tasks}
                editTask={editTask}
            />}
        </Container>
    </div>
}
export default Views;