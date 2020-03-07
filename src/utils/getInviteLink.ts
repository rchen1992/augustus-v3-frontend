export default function getInviteLink(token: string) {
    return `${process.env.REACT_APP_FRONTEND_DOMAIN}/invite/${token}`;
}
