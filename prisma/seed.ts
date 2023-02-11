import { PrismaClient } from '@prisma/client'
import slugify from 'slugify';
const prisma = new PrismaClient()


async function main() {

    await prisma.tag.createMany({
        data: [
            {
                name: 'Ăn vặt'
            },
            {
                name: 'Nhà hàng'
            },
            {
                name: 'Buffet'
            },
            {
                name: 'Giao đồ ăn'
            },
            {
                name: 'Quán nhậu',
            },
            {
                name: 'Bar & Pub'
            },
            {
                name: 'Tiệm bánh'
            },
            {
                name: 'Café / Dessert'
            },
            {
                name: 'Vận chuyển'
            },
            {
                name: 'Karaoke'
            },
            {
                name: 'Phòng khám'
            },
            {
                name: 'Công viên'
            },
            {
                name: 'Dịch vụ Internet'
            },
            {
                name: 'Khách sạn & nhà nghỉ'
            },
            {
                name: 'Homestay'
            },
            {
                name: 'Làm tóc'
            },
            {
                name: 'Dịch vụ giao hàng'
            },
            {
                name: 'Gym & thể thao'
            },
            {
                name: 'Shop & cửa hàng'
            },
            {
                name: 'Billiards'
            },
            {
                name: 'Làm đẹp & trang điểm'
            },
            {
                name: 'Tham quan'
            },
            {
                name: 'Studio ảnh & trang điểm'
            },
            {
                name: 'Online shop'
            },
            {
                name: 'Spa & Massage'
            },
            {
                name: "Rạp chiếu phim"
            },
            {
                name: "Sửa chửa & lắp đặt"
            },

        ]?.map(item => ({
            ...item,
            slug: slugify(item.name, {lower: true})
        }))
    })
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });