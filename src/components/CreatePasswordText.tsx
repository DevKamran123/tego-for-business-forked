import "../styles/components/CreatePasswordText.scss";

export default function CreatePasswordText() {
    return (
        <div className="createPassword_side_text_catchphrase_requirementsContainer">
            <div className="createPassword_side_text_catchphrase">
                Password recommendations
            </div>
            <div className="createPassword_side_text_catchphrase_requirementItem">
                <span className="createPassword_side_text_catchphrase_bullet"></span>
                <span className="createPassword_side_text_catchphrase_text">Minimum 8 characters</span>
            </div>
            <div className="createPassword_side_text_catchphrase_requirementItem">
                <span className="createPassword_side_text_catchphrase_bullet"></span>
                <span className="createPassword_side_text_catchphrase_text">Maximum 32 characters</span>
            </div>
            <div className="createPassword_side_text_catchphrase_requirementItem">
                <span className="createPassword_side_text_catchphrase_bullet"></span>
                <span className="createPassword_side_text_catchphrase_text">At least 1 lowercase letter (a - z)</span>
            </div>
            <div className="createPassword_side_text_catchphrase_requirementItem">
                <span className="createPassword_side_text_catchphrase_bullet"></span>
                <span className="createPassword_side_text_catchphrase_text">At least 1 uppercase letter (A - Z)</span>
            </div>
            <div className="createPassword_side_text_catchphrase_requirementItem">
                <span className="createPassword_side_text_catchphrase_bullet"></span>
                <span className="createPassword_side_text_catchphrase_text">At least 1 number (0 - 9)</span>
            </div>
            <div className="createPassword_side_text_catchphrase_requirementItem">
                <span className="createPassword_side_text_catchphrase_bullet"></span>
                <span className="createPassword_side_text_catchphrase_text">At least 1 special character (!#@$%)</span>
            </div>
        </div>
    )
}