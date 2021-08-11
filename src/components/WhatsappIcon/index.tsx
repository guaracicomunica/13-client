import { WhatsappIconProps } from "../../types/whatsapp";

export default function WhatsappIcon(props: WhatsappIconProps) {
    return (
        <div className="whatsapp-icon">
            <a href={`https://api.whatsapp.com/send?phone=${props.phone}&text=%20${props.message}`} target="_blank">
                <img src="/icons/whatsapp-icon.svg" alt="Whatsapp-icon" />
            </a>
        </div>
    );
}