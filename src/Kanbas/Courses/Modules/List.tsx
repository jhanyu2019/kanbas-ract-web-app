import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database/";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
} from "./reducer";
import { KanbasState } from "../../store";



function ModuleList() {
    const { courseId } = useParams();
    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);
    const dispatch = useDispatch();

        return (
            <>
                <div className="btn-list-modules-wrapper">
                    <div className="btn-list-modules">
                        <button className="btn btn-outline-secondary">Collapse All</button>
                        <button className="btn btn-outline-secondary">View Progress</button>
                        <select className="btn btn-outline-secondary">
                            <option>✓ Publish All</option>
                            <option>Unpublish All</option>
                        </select>
                        <button className="btn btn-danger">+ Module</button>
                        <button className="btn btn-outline-secondary incon-small">
                            <FaEllipsisV className="ms-2"/>
                        </button>
                    </div>
                </div>

                <div className="module-content">
                    <ul className="list-group wd-modules">
                        <li className="list-group-item">
                             <span className="float-end">
                            <button className="btn-update"
                                    onClick={() => dispatch(updateModule(module))}>
                            Update
                            </button>

                            <button className="btn-add"
                                    onClick={() => dispatch(addModule({ ...module, course: courseId }))}
                                    style={{ marginLeft: '5px' }}>
                            Add
                            </button>
                                 </span>


                            <div className="input-group-vertical">
                            <input value={module.name}
                                   onChange={(e) =>
                                       dispatch(setModule({ ...module, name: e.target.value }))
                                   }/>

                                <textarea value={module.description}
                                          onChange={(e) =>
                                              dispatch(setModule({ ...module, description: e.target.value }))
                                          }/>

                            </div>
                        </li>

                        {moduleList
                            .filter((module) => module.course === courseId)
                            .map((module, index) => (
                                <li key={index}
                                    className="list-group-item">
                                    <div>
                                        <FaEllipsisV className="me-2"/>
                                        {module.name}
                                        <span className="float-end">
              <button className="btn-delete"
                      onClick={() => dispatch(deleteModule(module._id))}>

                                    Delete
                                    </button>

                                    <button className="btn-edit "
                                            onClick={() => dispatch(setModule(module))}

                                style={{ marginLeft: '5px' }}>
                                    Edit
                                    </button>

              </span>
                                    </div>



                                    <ul className="list-group">

                                        <li className="list-group-item" key={index}>
                                            <FaEllipsisV className="me-2"/>
                                            {module.description}

                                            <span className="float-end">
                      <FaCheckCircle className="text-success"/>
                      <FaEllipsisV className="ms-2"/>
                    </span>
                                        </li>

                                        <li className="list-group-item" key={index}>
                                            <FaEllipsisV className="me-2"/>

                                            {module._id}
                                            <span className="float-end">
                      <FaCheckCircle className="text-success"/>
                      <FaEllipsisV className="ms-2"/>
                    </span>
                                        </li>


                                    </ul>

                                </li>
                            ))}
                    </ul>
                </div>
            </>
        );

}
export default ModuleList;

