import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";

function AddCabin () {
    return (
        <div>
            <Modal>
                <Modal.Open opens='cabin-form'>
                    <Button>Add new cabin</Button>
                </Modal.Open>
                <Modal.Window name='cabin-form'>
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
        </div>
    )
 }

// function AddCabin() {
//     const [isOpenForm, setIsOpenForm] = useState(false);
//
//     return (
//         <div>
//             <Button onClick={() => setIsOpenForm((show) => !show)}>
//                 Add new cabin
//             </Button>
//             {isOpenForm && <Modal onClose={() => setIsOpenForm(false)}>
//                 <CreateCabinForm onClose={() => setIsOpenForm(false)}/>
//             </Modal>}
//         </div>
//     )
//  }

 export default AddCabin