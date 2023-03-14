import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { errorHelper } from "utils.js/tools";

import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import {
    List,
    ListItem,
    ListItemText,
    Collapse,
    TextField,
    Button
} from "@mui/material";

const PriceRange = (props) => {
    const [open, setOpen] = useState(props.initState)
    const handleCollapseOpen = () => setOpen(!open);

    const formik = useFormik({
        initialValues: { min: 100, max: 5000 },
        validationSchema: Yup.object({
            min: Yup.number()
                .min(100, 'Minimum 100'),
            max: Yup.number()
                .max(5000, 'Maximum 5000')
        }),
        onSubmit: (values, {resetForm}) => {
            props.handleRange([values.min, values.max])
            resetForm();
        }
    })

    return (
        <div className="collapse_items_wrapper">
            <List>
                <ListItem onClick={handleCollapseOpen}>
                    <ListItemText
                        primary="Price Range"
                        className="collapse_title"
                    />
                    {open ? <ArrowDropUp /> : <ArrowDropDown />}

                </ListItem>
                <Collapse in={open} timeout="auto">
                    <List component="div" disablePadding>
                        <form className="mt-3" onSubmit={formik.handleSubmit}>
                            <div>
                                <TextField
                                    placeholder="$ Min"
                                    name="min"
                                    variant="outlined"
                                    type="number"
                                    {...formik.getFieldProps('min')}
                                    {...errorHelper(formik, 'min')}
                                />
                            </div>
                            <div>
                                <TextField
                                    placeholder="$ Max"
                                    name="max"
                                    variant="outlined"
                                    type="number"
                                    {...formik.getFieldProps('max')}
                                    {...errorHelper(formik, 'max')}
                                />
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    className="mt-3"
                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                >
                                    Search
                                </Button>
                            </div>
                        </form>
                    </List>
                </Collapse>
            </List>
        </div>
    )
}

export default PriceRange