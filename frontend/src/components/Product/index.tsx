import React, { useContext, useEffect, useState } from 'react'
import { Container, CardBody, LateralButtons } from './styles'
import Leite from '../../leite.jpg'
import NoImage from '../../no-image.png'
import CreateIcon from '@mui/icons-material/Create';
import { grey } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { addProduct, deleteProduct, editProduct, ProductInterface } from '../../services/products';
import ProductContext, { DEFAULT_VALUE } from '../../context/product'
import { confirm, clearInputs } from '../../utils/utils'
import Swal from 'sweetalert2'
interface ProductContainerProps {
    isUpload: boolean;
    product: ProductInterface
}

export const Product = (props: ProductContainerProps) => {
    const { isUpload, product } = props
    const [isSubmit, setIsSubmit] = useState(false)

    const { state, setState: setGlobalState, setRefresh } = useContext(ProductContext)

    const handleSubmit = async () => {
        const confirmation = await confirm('adicionar')
        if (confirmation) {
            try {
                await addProduct(state)
                Swal.fire('Sucesso!', 'Produto adicionado', 'success')
                setRefresh(true)
                setGlobalState(DEFAULT_VALUE.state)
            }
            catch (e) {
                console.log('DEU RUIM', e)
            }
        }
        else {
            Swal.fire('Cancelado!', 'Nenhuma alteração foi feita', 'info')
        }
    }

    const handleEdit = async () => {
        const confirmation = await confirm('editar')
        if (confirmation) {
            const obj = {
                id: product.id,
                name: (state.name == DEFAULT_VALUE.state.name) ? product.name : state.name,
                logo: (state.logo == DEFAULT_VALUE.state.logo) ? product.logo : state.logo,
                value: (state.value == DEFAULT_VALUE.state.value) ? product.value : state.value
            }
            await editProduct(obj)
            setRefresh(true)
            Swal.fire('Sucesso!', 'Produto editado', 'success')
        }
        else {
            Swal.fire('Cancelado!', 'Nenhuma alteração foi feita', 'info')
        }
    }

    const handleDelete = async () => {
        const confirmation = await confirm('deletar')
        if (confirmation) {
            try {
                if (product)
                    await deleteProduct(product)
                setRefresh(true)
                Swal.fire('Sucesso!', 'Produto deletado', 'success')
            }
            catch (e) {
                console.log(e)
            }
        }
        else {
            Swal.fire('Cancelado!', 'Nenhuma alteração foi feita', 'info')
        }
    }
    return (
        <Container>
            <LateralButtons>
                {(!isSubmit && !isUpload) &&
                    <>
                        <button onClick={() => {
                            setIsSubmit(true)
                        }}><CreateIcon sx={{ color: grey[900] }} /></button>
                        <button
                            onClick={handleDelete}
                        >
                            <ClearIcon sx={{ color: grey[900] }} />
                        </button>
                    </>}
                {(isUpload || isSubmit) &&
                    <>
                        <button>
                            <CheckIcon onClick={() => {
                                if (isUpload) {
                                    handleSubmit()
                                }
                                else {
                                    if (product)
                                        handleEdit()
                                }
                                setIsSubmit(false)
                            }} sx={{ color: grey[900] }} />
                        </button>
                        <button
                        onClick={()=>clearInputs(product.id)}
                        >
                            <DoDisturbIcon sx={{ color: grey[900] }} />
                        </button>
                    </>
                }
            </LateralButtons>
            <CardBody>
                <button>
                    <img src={isUpload ? NoImage : Leite} alt="logo" />
                </button>
                <div>
                    <input
                        id="name-input"
                        className={product.id}
                        defaultValue={product.name}
                        disabled={!isSubmit && !isUpload}
                        onChange={(e) => setGlobalState({ ...state, name: e.target.value })}
                    />
                    <input
                        id="value-input"
                        className={product.id}
                        defaultValue={product.value == 0?"":product.value}
                        disabled={!isSubmit && !isUpload}
                        onChange={(e) => setGlobalState({ ...state, value: Number(e.target.value) })}
                    />
                </div>
            </CardBody>
        </Container>
    )
}

export default Product