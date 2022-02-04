import Swal from 'sweetalert2'

export const confirm = async (action:string) => {
    const result = await Swal.fire({
        title: `Deseja ${action} produto?`,
        icon: 'question',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: `Não`,
      })
    if(result.isConfirmed){
        return true
    }
    else{
        return false
    }
}