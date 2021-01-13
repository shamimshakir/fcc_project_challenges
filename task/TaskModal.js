import {Modal, Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";

function TaskModal({showModal, modalClose, modalShow, setTasks, tasks, editTask}){
    const [task, setTask] = useState("");
    const [editedTask, setEditedTask] = useState(tasks[editTask]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            task,status:false
        }
        if(editTask !== null){
            let editedTasks = tasks.map((task, index) => {
                if(index === editTask){
                    return newTask;
                }else {
                    return task;
                }
            });
            setTasks([...editedTasks]);
        }else{
            setTasks([...tasks, newTask]);
        }
        modalClose(true);
    }
    // useEffect(() => {
    //     console.log(task)
    // }, [task])
    return <Modal
        show={showModal}
        onHide={modalClose}
        backdrop="static"
        keyboard={false}
    >
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="task">
                    <Form.Label>Write Task</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Write Task"
                        defaultValue={editedTask ? editedTask.task : ""}
                        onChange={(e) => {setTask(e.target.value)}}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={modalClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" className="mt-2">
                    Submit
                </Button>
            </Modal.Footer>
        </Form>
    </Modal>
}
export default TaskModal;