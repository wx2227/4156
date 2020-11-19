import React from 'react';
import Cookies from 'js-cookie';

class UploadForm extends React.Component<Props> {
    toBase64 : String = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    async isCourseNumberValid(courseNumber) : boolean{
        const courses = await fetch("http://127.0.0.1:8000/api/course").then(res => res.json());
        for (let course of courses) {
            if (course.course_number === courseNumber){
                return true;
            }
        }
        return false;
    }
    async uploadFile() {
        if (document.getElementById("file").files.length === 0){
            return alert("Please Select File");
        }
        const file = document.getElementById("file").files[0];
        if (!file || file.type !== "application/pdf") {
            return alert("Please Select PDF File");
        }
        const base64 = (await this.toBase64(file)).split(',')[1];
        const binary = atob(base64);
        let array = [];
        for (let i = 0; i < binary.length; ++i) {
            array.push(binary.charCodeAt(i));
        }
        const blobData = new Blob([new Uint8Array(array)], {type: "application/pdf"});
        const response = await fetch("https://dlorx585o9.execute-api.us-west-1.amazonaws.com/v1/upload", {
            headers: {'Content-Type': 'application/pdf'},
            method: "POST",
            body: blobData
        }).then(response => response.json())
        console.log(response)
        return response;
    }
    async handleSubmit(event) {
        event.preventDefault();
        const userID = Cookies.get("user_id") - 0;
        console.log(userID);
        const fileName = document.getElementById("fileName").value;
        const courseNumber = document.getElementById("courseNumber").value;
        const description = document.getElementById("description").value;
        if (!await this.isCourseNumberValid(courseNumber)) {
            alert("The course number is not valid");
            return;
        }
        const uploadResponse = await this.uploadFile();
        if (!uploadResponse){
            return;
        }
        const fileUrl = uploadResponse.body.file_url;
        const data = {file_name: fileName, file_url: fileUrl, description: description, user_id: userID, course_number: courseNumber}
        console.log(data);
        await fetch("http://localhost:8000/api/note/", {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            window.location.href = "/airnote/note/" + response.id;
        })
        .catch(err => console.log(err));
    }
    render() {
        return (
            <form className="p-4 m-4" onSubmit={(event)=>this.handleSubmit(event)}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="fileName">File Name</label>
                        <input className="form-control" type="text" placeholder="File name" id="fileName" required />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="courseNumber">Course Number</label>
                        <input className="form-control" type="text" placeholder="Course Number" id="courseNumber" required />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" placeholder="Description" id="description" rows="5" required />
                </div>
                <div className="form-group">
                    <label htmlFor="file">Upload your file</label>
                    <input className="form-control-file" type="file" name="file" id="file" required />
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        )
    }
}

export default UploadForm;