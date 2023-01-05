import {
    EmojiHappyIcon,
    ChartSquareBarIcon,
    CursorClickIcon,
    DeviceMobileIcon,
    AdjustmentsIcon,
    SunIcon,
} from "@heroicons/react/outline";

import benefitOneImg from "../public/img/benefit-one.png";
import benefitTwoImg from "../public/img/benefit-two.png";

const benefitOne = {
    title: "Бидний давуу тал",
    desc: "You can use this space to highlight your first benefit or a feature of your product. It can also contain an image or Illustration like in the example along with some bullet points.",
    image: benefitOneImg,
    bullets: [
        {
            title: "Интерактив сурах платформ",
            desc: "Жижиг алхам бүр ",
            icon: <EmojiHappyIcon />,
        },
        {
            title: "Уйдаахгүй жижиг хичээлүүд",
            desc: "Нэг бүтэн бичлэг үзэх бус жижгээр гардан хийх",
            icon: <ChartSquareBarIcon />,
        },
        {
            title: "Прожектд суурилсан онолын мэдлэг",
            desc: "Блокчейны онолын ойлголтыг профект хийнгээ сурах",
            icon: <CursorClickIcon />,
        },
    ],
};

const benefitTwo = {
    title: "Offer more benefits here",
    desc: "You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.",
    image: benefitTwoImg,
    bullets: [
        {
            title: "Mobile Responsive Template",
            desc: "Nextly is designed as a mobile first responsive template.",
            icon: <DeviceMobileIcon />,
        },
        {
            title: "Powered by Next.js & TailwindCSS",
            desc: "This template is powered by latest technologies and tools.",
            icon: <AdjustmentsIcon />,
        },
        {
            title: "Dark & Light Mode",
            desc: "Nextly comes with a zero-config light & dark mode. ",
            icon: <SunIcon />,
        },
    ],
};

export { benefitOne, benefitTwo };
