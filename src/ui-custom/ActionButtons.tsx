import { ItemMode } from "./common.types";

export type ActionButtonsProps = {
    mode: ItemMode,
    onEdit: () => void,
    onSave: () => void,
}

export default function ActionButtons(props: ActionButtonsProps) {

    function handleEdit() {
        props.onEdit();
    }

    function handleSave() {
        props.onSave();
    }

    const isEditMode = props.mode === "edit";

    return (
        <div>
            <button onClick={isEditMode ? handleSave : handleEdit}>
                {isEditMode ? "Save" : "Edit" }
            </button>
        </div>
    )
}