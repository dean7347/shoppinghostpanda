export const adminSidebarItems = [
  {
    display_name: "관리자페이지",
    route: "/ekjd/admin/dashboard",
    icon: "bx bx-category-alt",
  },
  {
    display_name: "회원 관리",
    route: "/ekjd/admin/memberManagement",
    icon: "bx bx-user-pin",
  },
  {
    display_name: "판다 정산",
    route: "/ekjd/admin/pandaManagement",
    icon: "bx bx-leaf",
  },
  {
    display_name: "판매자 정산",
    route: "/ekjd/admin/sellerManagement",
    icon: "bx bx-store-alt",
  },
  {
    display_name: "신분 신청",
    route: "/ekjd/admin/applyManagement",
    icon: "bx bx-notification",
  },
];

export const adminDashboardCard = [
  {
    link: "/ekjd/admin/pandaManagement",
    icon: "bx bxs-gift",
    count: 0,
    title: "정산필요",
  },
  {
    link: "/ekjd/admin/pandaManagement",
    icon: "bx bx-won",
    count: 0,
    title: "정산완료",
  },
];

export const adminApplyListCard = [
  {
    link: "",
    icon: "bx bxs-gift",
    count: 0,
    title: "상점신청",
  },
  {
    link: "",
    icon: "bx bx-won",
    count: 0,
    title: "판다신청",
  },
];
