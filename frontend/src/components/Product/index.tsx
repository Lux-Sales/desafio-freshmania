import React, { useState } from 'react'
import { Container, CardBody, LateralButtons } from './styles'
import Leite from '../../leite.jpg'
import NoImage from '../../no-image.png'
import CreateIcon from '@mui/icons-material/Create';
import { grey } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { ProductInterface } from '../../services/products';

interface ProductContainerProps{
isUpload:boolean;
product:ProductInterface|undefined
}

export const Product = (props:ProductContainerProps) => {
    const {isUpload, product} = props
    const [isSubmit, setIsSubmit] = useState(false)

    return (
        <Container>
            <LateralButtons>
                {(!isSubmit && !isUpload)  &&
                    <>
                    <button onClick={() => {
                        setIsSubmit(true)
                    }}><CreateIcon sx={{ color: grey[900] }} /></button>
                    <button>
                        <ClearIcon sx={{ color: grey[900] }} />
                    </button>
                    </>}
                    {(isUpload || isSubmit) && 
                    <>
                    <button>
                    <CheckIcon onClick={()=>{
                        setIsSubmit(false)
                    }}sx={{ color: grey[900] }}/>
                    </button>
                    <button>
                    <DoDisturbIcon sx={{ color: grey[900] }}/>
                    </button>
                    </>
                    }
            </LateralButtons>
            <CardBody>
                <button>
                    <img src={isUpload?NoImage:Leite} alt="logo" />
                </button>
                <div>
                    <input id="title-input" defaultValue={isUpload?"":product?.name} disabled={!isSubmit && !isUpload}/>
                    <input id="value-input" defaultValue={isUpload?"":`R$${product?.value}`} disabled={!isSubmit && !isUpload} />
                </div>
            </CardBody>
        </Container>
    )
}

export default Product