export default function getInviteLink(ladderId: string, token: string) {
    return `${process.env.REACT_APP_FRONTEND_DOMAIN}/${ladderId}/invite/${token}`;
}
