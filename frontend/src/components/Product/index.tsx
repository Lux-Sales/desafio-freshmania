import React, { useContext, useState } from 'react'
import { Container, CardBody, LateralButtons } from './styles'
import UploadPhoto from '../../assets/upload-photo.jpg'
import CreateIcon from '@mui/icons-material/Create';
import { grey } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { addProduct, deleteProduct, editProduct, ProductInterface } from '../../services/products';
import ProductContext from '../../context/product'
import { confirm, clearInputs } from '../../utils/utils'
import Swal from 'sweetalert2'
interface ProductContainerProps {
    isUpload: boolean;
    product: ProductInterface
}

export const Product = (props: ProductContainerProps) => {
    const { isUpload, product } = props
    const [isSubmit, setIsSubmit] = useState(false)
    const [logo, setLogo] = useState<File | undefined>(undefined)

    const { state, setState: setGlobalState, setRefresh } = useContext(ProductContext)

    const handleSubmit = async () => {
        const confirmation = await confirm('adicionar')
        if (confirmation) {
            try {
                await addProduct(state, logo)
                Swal.fire('Sucesso!', 'Produto adicionado', 'success')
                setRefresh(true)
                clearInputs(product.id, state, setGlobalState)
                handleShowImage()
                setIsSubmit(false)
            }
            catch (e) {
                Swal.fire('Oops!', 'Ocorreu um erro ao adicionar produto, verifique os campos e tente novamente', 'info')
            }
        }
        else {
            Swal.fire('Cancelado!', 'Nenhuma alteração foi feita', 'info')
        }
    }

    const handleEdit = async () => {
        const confirmation = await confirm('editar')
        if (confirmation) {
            if (product.name == "default" || product.value == 0) {
                return Swal.fire('Oops!', 'Preencha todos os campos corretamente!', 'info')
            }
            const obj = {
                ...state,
                id: product.id,
                name: (state.name == "default") ? product.name : state.name,
                value: (state.value == 0) ? product.value : state.value
            }
            try {
                await editProduct(obj,logo)
                setRefresh(true)
                setIsSubmit(false)
                Swal.fire('Sucesso!', 'Produto editado', 'success')
            }
            catch (e) {
                Swal.fire('Oops!', 'Ocorreu um erro ao editar produto, verifique os campos e tente novamente', 'info')
            }
        }
        else {
            Swal.fire('Cancelado!', 'Nenhuma alteração foi feita', 'info')
        }
    }

    const handleDelete = async () => {
        const confirmation = await confirm('deletar')
        if (confirmation) {
            try {
                await deleteProduct(product)
                setRefresh(true)
                window.location.reload()
                Swal.fire('Sucesso!', 'Produto deletado', 'success')
            }
            catch (e) {
                Swal.fire('Oops!', 'Ocorreu um erro ao deletar produto!', 'info')
            }
        }
        else {
            Swal.fire('Cancelado!', 'Nenhuma alteração foi feita', 'info')
        }
    }

    function handleShowImage() {
        //initial state for upload component
        if (isUpload && logo == undefined){
            return UploadPhoto
        }
        //image addeded to upload
        else if (isUpload && logo != undefined && product.id=="uploading"){
            return state.logo
        }
        //initial state for product
        else if (!isUpload && logo == undefined){
            return product.logo
        }
        // image addeded to product
        else if (!isUpload && logo != undefined){
            return state.logo
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
                                    handleEdit()
                                }
                            }} sx={{ color: grey[900] }} />
                        </button>
                        <button
                            onClick={() =>
                                clearInputs(product.id, state, setGlobalState)
                            }
                        >
                            <DoDisturbIcon sx={{ color: grey[900] }} />
                        </button>
                    </>
                }
            </LateralButtons>
            <CardBody>
                <button>
                    <input type="file"
                        className={product.id}
                        disabled={!isSubmit && !isUpload}
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setGlobalState({ ...state, logo: URL.createObjectURL(e.target.files[0]) })
                                setLogo(e.target.files[0])
                            }
                        }}
                    />
                    <img id="img-field" src={handleShowImage()} alt="logo" />
                </button>
                <div>
                    <input
                        id="name-input"
                        className={product.id}
                        defaultValue={product.name}
                        placeholder={isUpload ? "Nome do produto" : ""}
                        disabled={!isSubmit && !isUpload}
                        onChange={(e) => setGlobalState({ ...state, name: e.target.value })}
                    />
                    <div>
                        <label htmlFor="value-input">R$</label>
                        <input
                            id="value-input"
                            className={product.id}
                            defaultValue={product.value == 0 ? "" : product.value}
                            placeholder={isUpload ? "Valor" : " "}
                            disabled={!isSubmit && !isUpload}
                            onChange={(e) => setGlobalState({ ...state, value: Number(e.target.value) })}
                        />
                    </div>
                </div>
            </CardBody>
        </Container>
    )
}

export default Product