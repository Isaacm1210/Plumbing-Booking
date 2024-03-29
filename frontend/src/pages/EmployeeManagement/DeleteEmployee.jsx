import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Alert, AlertTitle, Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { tokens } from "../../theme.js";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance.js';
import Spinner from 'react-bootstrap/esm/Spinner';

const DeleteEmployee = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const minwidth1 = useMediaQuery('(min-width:800px)');
  const minwidth2 = useMediaQuery('(min-width:500px)');
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);
  const [ serverError, setServerError ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, [])

  const handleDelete = () => {
    axiosInstance
      .delete(`/employees/${id}`)
      .then(
        navigate('/employee')
      )
      .catch((error) => {
        setServerError(false);
        console.log(error.response.status)
        if (error.response.status === 500) {
            setServerError(true);
        }
    })
  }

  return (
    <Box >
      <Header title={"EMPLOYEE"} subtitle={"Delete Employee"} />
      {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'>
        <Spinner />
      </div>
      ) : (
        <Box m="100px" sx={{ width: minwidth1 ? 'auto' : minwidth2 ? '80%' : '100%' }}>
          <Box sx={{ margin: 'auto', width: '60%', boxShadow: '4', border: 'solid', borderWidth: "2px", borderRadius: '5px' }}>
          {serverError &&
                    <Alert severity="error">
                        <AlertTitle>Server Error</AlertTitle>
                        Internal Server Error. Please Try Again Later.
                    </Alert>}
            <Typography
              variant='h2'
              textAlign={'center'}
              m="10px"
              p="10px"
            >
              <DeleteForeverIcon sx={{ height: '50px', width: '50px', color: "red" }} />
              Delete Forever?
            </Typography>
            <Typography
              variant='h4'
              textAlign={'center'}
              m={'10px 0'}
              p={'40px'}
            >
              <div>
                This will Delete <b>{employee.firstName + ' ' + employee.lastName}</b> Forever!
              </div>
              <br />
              Are You sure you want to Delete?
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" sx={{ margin: 'auto', pt: '2%', width: minwidth1 ? '15%' : minwidth2 ? '40%' : '40%',}}>
            <Link to={'/employee'}>
              <Button sx={{
                backgroundColor: colors.grey[500],
                fontWeight: 'bold',
                fontSize: '13px',
              }}
              >
                BACK
              </Button>
            </Link>
            <Button sx={{
              backgroundColor: colors.redButton,
              fontWeight: 'bold',
              fontSize: '13px',
            }}
              onClick={handleDelete}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default DeleteEmployee