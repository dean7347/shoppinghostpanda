export const pandaSidebarItems = [
    {
        "display_name": "판다페이지",
        "route": "/panda/dashboard",
        "icon": "bx bx-category-alt"
    },
    {
        "display_name": "영상 관리",
        "route": "/panda/video",
        "icon": "bx bxs-videos"
    },
    {
        "display_name": "정산 관리",
        "route": "/panda/settlement",
        "icon": "bx bx bx-won"
    }
]

export const pandaDashboardCard = [
    {
        "link": "/panda/video",
        "icon": "bx bxs-gift",
        "count": 0,
        "title": "판매"
    },
    {
        "link": "/panda/settlement",
        "icon": "bx bx-won",
        "count": 0,
        "title": "충전금"
    }
]

export const chartOptions = {
    series: [{
        name: 'Online Customers',
        data: [40,70,20,90,36,80,30,91,60]
    }, {
        name: 'Store Customers',
        data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10]
    }],
    options: {
        color: ['#6ab04c', '#2980b9'],
        chart: {
            background: 'transparent',
            height: '800px'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
}