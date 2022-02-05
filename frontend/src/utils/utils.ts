import Swal from 'sweetalert2'

export const confirm = async (action: string) => {
    const result = await Swal.fire({
        title: `Deseja ${action} produto?`,
        icon: 'question',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: `Não`,
    })
    if (result.isConfirmed) {
        return true
    }
    else {
        return false
    }
}

export const clearInputs = (id: string | undefined) => {
    var elements = document.getElementsByTagName('input');
    console.log(elements[0].className)
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].className == id)
            elements[i].value = ""
    }
}