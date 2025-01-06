// ** React Imports
import type { FC } from 'react';
import { Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Icon Imports

// ** Third Party Imports
import { IconButton } from '@mui/material'
import { useDropzone } from 'react-dropzone'

import IconifyIcon from '../icon/IconifyIcon'


type Tprops = {
  files: File[],
  title: string,
  setFiles: any
}

const FileUploaderSingle: FC<Tprops> = ({ files, setFiles, title }) => {
  const handleRemoveFile = () => setFiles([])

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const img = files.map(file => (
    <Fragment key={file.name}>
      <IconButton
        onClick={handleRemoveFile}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 1,
          color: theme => theme.palette.grey[500],
          '&:hover': {
            color: theme => theme.palette.grey[900]
          }
        }}
      >
        <IconifyIcon icon='tabler:x' fontSize='2rem' />
      </IconButton>
      <img key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file)} />
    </Fragment>
  ))

  return (
    <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 450 } : {}}>
      <input {...getInputProps()} />
      {files.length ? (
        img
      ) : (
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Box
            sx={{
              mb: 8.75,
              width: 48,
              height: 48,
              display: 'flex',
              borderRadius: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `rgb(var(--mui-palette-text-primaryChannel) / 0.08)`
            }}
          >
            <IconifyIcon icon='tabler:upload' fontSize='2rem' />
          </Box>
          <Typography variant='h4' sx={{ mb: 2.5 }}>
            Drop files {title} here or click to upload.
          </Typography>
          {/* <Typography sx={{ color: 'text.secondary' }}>
            (This is just a demo drop zone. Selected files are not actually uploaded.)
          </Typography> */}
        </Box>
      )}
    </Box>
  )
}

export default FileUploaderSingle
