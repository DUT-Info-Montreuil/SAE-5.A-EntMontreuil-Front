export interface Notification {
    id: number;
    id_user: number;
    content: string;
    is_read: boolean;
    created_at: string;
    title: string;
    icon: string;
    icon_color: string;
    route: string;
}