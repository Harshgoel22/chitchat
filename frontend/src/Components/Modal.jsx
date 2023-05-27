import {Typography, Modal} from '@mui/material';

const MyModal = (props)=>{

    return (
        <Modal
        open={props.open}
        onClose={()=>{props.setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div class="mt-[17%] ml-[42%] bg-gray-700 min-h-20 w-64 rounded-lg p-4 px-5">
          <Typography id="modal-modal-title" variant="h6" component="h2" class='text-white font-bold text-lg'>
            Error
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} class="text-white font-md">
            Sorry! Invalid Credentials.
          </Typography>
          <button onClick={()=>{props.setOpen(false)}} class="bg-white rounded-lg font-semibold text-md w-10 pr-1 ml-44 mt-2">OK</button>
        </div>
      </Modal>
    )
}

export default MyModal;