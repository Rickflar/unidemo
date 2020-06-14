import user from '../../images/placeholders/User.png';

const Departments = [
    {
        id: 1, mode: 2, name: "Департамент учебной и воспитательной работы", pulpits: [
            { id: 11, mode: 2, name: "Учебное управление", director: "Маркелова Наталья Викторовна", phone: "+7 (812) 494-70-85", room: "Пушкина 1311", web: "http://guap.ru/uch", avatar: "http://media.guap.ru/2221/markelova_nv.jpg?s=xs", email: "umuoffice@aanet.ru", type: "Заведующий" },
            { id: 12, mode: 2, name: "Приемная комиссия университета", director: "Мичурин Сергей Владимирович", phone: "+7 (812) 312-21-07", room: "Пушкина 6205", web: "http://portal.guap.ru/?n=priem/", avatar: "http://media.guap.ru/1045/michurin_sv.jpg?s=xs", email: "guap-pk@aanet.ru", type: "Заведующий" },
            { id: 13, mode: 2, name: "Библиотека университета", director: "Степанова Антонина Павловна", phone: "+7 (812) 710-66-42", room: "Пушкина 1200", web: "http://lib.aanet.ru", avatar: '', email: "umuoffice@aanet.ru", type: "Заведующий" },
            { id: 14, mode: 2, name: "Управление по работе с молодежью и стратегическим коммуникациям", director: "Николаева Лариса Игоревна", phone: "+7 (812) 314-37-08", room: "Пушкина 1104", web: "http://new.guap.ru/urmisk", avatar: "http://media.guap.ru/1239/_nikolaeva.jpg?s=xs", email: "urmisk@guap.ru", type: "Заведующий" },
            { id: 15, mode: 2, name: "Редакционно-издательский центр", director: "Самоловов Михаил Олегович", phone: "+7 (812) 494-70-36", room: "Пушкина 1126", web: " http://new.guap.ru/ric", avatar: '', email: "rio07@guap.ru", type: "Заведующий" },
        ],
        iddir: 1, director: "Боер Виктор Матвеевич", phone: "+7 (812) 312-67-14", room: "Пушкина 1225а", avatar: "http://media.guap.ru/1044/boer_vm.jpg?s=xs", type: "Проректор по учебно-воспитательной работе",
        web: "",
        email: "boer@guap.ru"
    },
    {
        id: 2, mode: 2, name: "Департамент научной и инновационной деятельности", pulpits: [
            { id: 21, mode: 2, name: "Центр координации научных исследований", director: "Рабин Алексей Владимирович", phone: "+7 (812) 494-70-90", room: "Пушкина 1435", web: "http://science.guap.ru/structure/centers/ckni/", avatar: "https://pro.guap.ru/files/img/exsamle/picture-178-1450646481.jpg", email: "alexey.rabin@guap.ru", type: "Заведующий" },
            { id: 22, mode: 2, name: "Международный институт передовых аэрокосмических технологий", director: "Небылов Александр Владимирович", phone: "+7 (812) 494-70-16", room: "Пушкина 1318", web: "http://iiaat.guap.ru", avatar: "https://pro.guap.ru/files/img/exsamle/picture-139-1389869341.jpg", email: "iiaat@aanet.ru", type: "Заведующий" },
            { id: 23, mode: 2, name: "Институт высокопроизводительных компьютерных и сетевых технологий", director: "Шейнин Юрий Евгеньевич", phone: "+7 (812) 710-65-10", room: "Пушкина 5404", web: "http://guap.ru/guap/ivcst", avatar: "http://media.guap.ru/1021/sheinin_yue.jpg?s=xs", email: "sheynin@aanet.ru", type: "Заведующий" },
            { id: 24, mode: 2, name: "Институт проблем волновой электроники", director: "Кулаков Сергей Викторович", phone: "+7 (812) 373-42-16", room: "Колотушкина С-32", web: "", avatar: "https://pro.guap.ru/files/img/exsamle/picture-310-1378896959.jpg", email: "svk@aanet.ru", type: "Заведующий" },
            { id: 25, mode: 2, name: "Международный российско-французский центр трансфера технологий", director: "Оводенко Анатолий Аркадьевич", phone: "+7 (812) 373-42-16", room: "Колотушкина 2212", web: " http://new.guap.ru/ric", avatar: "http://media.guap.ru/1004/ovodenko_aa.jpg?s=xs", email: "rio07@guap.ru", type: "Заведующий" },
            { id: 26, mode: 2, name: "Северо-Западный инновационно-образовательный центр космических услуг 'КосмоИнформ-центр'", director: "Героев Владимир Владимирович", phone: "+7 (812) 570-64-32", room: "Пушкина", web: "http://guap.ru/guap/cosminfo", avatar: '', email: "sic@guap.ru", type: "Заведующий" },
            { id: 27, mode: 2, name: "Научно-исследовательский отдел биотехнических проблем", director: "Килимник Вячеслав Александрович", phone: "+7 (812) 494-70-49", room: "Пушкина 5404", web: "", avatar: '', email: "kil@aanet.ru", type: "Заведующий" },
            { id: 28, mode: 2, name: "Управление информатизации", director: "Сергеев Антон Валерьевич", phone: "+7 (812) 494-70-52", room: "Пушкина 1348", web: "", avatar: "https://pro.guap.ru/files/img/exsamle/20/SergeevAV-7.png", email: "", type: "Заведующий" },
            { id: 29, mode: 2, name: "Отдел автоматизированных информационных систем", director: "Башун Владимир Владимирович", phone: "+7 (812) 494-70-82", room: "Пушкина 1348", web: "", avatar: "https://pro.guap.ru/files/img/exsamle/1837/pic1.jpg", email: "ais_team@guap.ru", type: "Заведующий" },
            { id: 20, mode: 2, name: "Отдел организации обработки персональных данных", director: "Ильина Дарья Викторовна", phone: "+7 (812) 494-70-77", room: "Пушкина 1442", web: " http://new.guap.ru/ric", avatar: "https://pro.guap.ru/files/img/exsamle/1844/wpr8IZQw6E8%20(2).jpg", email: "cert@guap.ru", type: "Заведующий" },
        ],
        iddir: 2, director: "Нет данных", phone: "", room: "Пушкина ", avatar: '', type: "Нет данных",
        web: "http://science.guap.ru",
        email: ""
    },
    {
        id: 3, mode: 2, name: "Департамент международной деятельности", pulpits: [
            { id: 31, mode: 2, name: "Отдел по работе с иностранными студентами", director: "Карпова Ксения Андреевна", phone: "+7 (812) 312-25-77", room: "Пушкина 1451", web: "http://guap.info", avatar: "https://guap.info/wp-content/uploads/2015/09/Karpova.jpg", email: "iiep@aanet.ru", type: "Заведующий" },
            { id: 32, mode: 2, name: "Отдел довузовской подготовки иностранных граждан", director: "Белич Елена Владимировна", phone: "+7 (812) 312-25-77", room: "Пушкина 1451", web: "http://guap.info", avatar: "http://guap.info/wp-content/uploads/2015/09/Belich.jpg", email: "iiep@aanet.ru", type: "Заведующий" },
            { id: 33, mode: 2, name: "Паспортно-визовый отдел", director: "Чинарова Елена Александровна", phone: "+7 (812) 570-13-32", room: "Пушкина 1451", web: "http://guap.info", avatar: "https://guap.info/wp-content/uploads/2015/09/Chinarova.jpg", email: "iiep@aanet.ru", type: "Заведующий" },
            { id: 34, mode: 2, name: "Отдел международного сотрудничества", director: "Макарова Юлия Владимировна", phone: "+7 (812) 312-09-37", room: "Пушкина 1451", web: "http://guap.info", avatar: "https://guap.info/wp-content/uploads/2015/09/Makarova.jpg", email: "iiep@aanet.ru", type: "Заведующий" },
        ],
        iddir: 3, director: "Лосев Константин Викторович", phone: "+7 (812) 315-77-78", room: "Пушкина 1224", avatar: "http://guap.info/wp-content/uploads/2015/09/K_Losev1.jpg", type: "Проректор по международной деятельности",
        web: "http://guap.info",
        email: "losev@guap.ru"
    },
    {
        id: 4, mode: 2, name: "Административный департамент", pulpits: [
            { id: 41, mode: 2, name: "Управление персонала", director: "Плотников Александр Анатольевич", phone: "+7 (812) 312-50-52", room: "Пушкина 2304", web: "", avatar: '', email: "plotn@aanet.ru", type: "Заведующий" },
            { id: 42, mode: 2, name: "Отдел кадров работников", director: "Климина Раиса Петровна", phone: "+7 (812) 571-40-43", room: "Пушкина 2305", web: "", avatar: '', email: "tresh@guap.ru", type: "Заведующий" },
            { id: 43, mode: 2, name: "Отдел кадров обучающихся", director: "Щербакова Надежда Александровна ", phone: "+7 (812) 494-70-07", room: "Пушкина 2305", web: "", avatar: '', email: "stud_ok@guap.ru", type: "Заведующий" },
            { id: 44, mode: 2, name: "Отдел делопроизводства", director: "Киселева Татьяна Сергеевна", phone: "+7 (812) 494-70-05", room: "Пушкина 1314", web: "", avatar: '', email: "odou@aanet.ru", type: "Заведующий" },
            { id: 45, mode: 2, name: "Второй отдел", director: "Федеев Виктор Ильич", phone: "+7 (812) 312-50-60", room: "Пушкина 1233", web: "", avatar: '', email: "fvi@guap.ru", type: "Заведующий" },
            { id: 46, mode: 2, name: "Медицинский центр университета", director: "Ворошина Людмила Васильевна", phone: "+7 (812) 315-40-82", room: "Пушкина 3201", web: "http://guap.ru/guap/main/med_main.shtml", avatar: '', email: "medcenter@guap.ru", type: "Заведующий" },
            { id: 47, mode: 2, name: "Общежитие №1", director: "Дёмкина Людмила Николаевна", phone: "+7 (812) 757-28-77", room: "пр. М. Жукова, д. 24", web: "http://portal.guap.ru/?n=dom", avatar: '', email: "hostel1@guap.ru", xm: 59.860306, ym: 30.235613, type: "Заведующий" },
            { id: 48, mode: 2, name: "Общежитие №2", director: "Федоров Денис Вячеславович", phone: "+7 (812) 520-14-70", room: "ул. Передовиков, д. 13", web: "http://portal.guap.ru/?n=dom", avatar: "https://pp.userapi.com/c631524/v631524883/47a8f/f6CsiClp5oQ.jpg", email: "denis@guap.ru", xm: 59.941367, ym: 30.467746, type: "Заведующий" },
            { id: 49, mode: 2, name: "Общежитие №3", director: "Сафина Зульфия Максудовна", phone: "+7 (812) 368-00-30", room: "ул. Варшавская, д. 8", web: "http://portal.guap.ru/?n=dom", avatar: '', email: "zs2208@guap.ru", xm: 59.877931, ym: 30.313910, type: "Заведующий" },
            { id: 410, mode: 2, name: "Отдел по работе в общежитиях", director: "Пивцаев Михаил Юрьевич", phone: "+7 (812) 494-70-37", room: "Пушкина 5250а", web: "http://portal.guap.ru/?n=dom", avatar: '', email: "4947095@guap.ru", type: "Заведующий" },
            { id: 411, mode: 2, name: "Отдел контрольно-пропускного режима", director: "Васильченко Анатолий Александрович", phone: "+7 (812) 571-27-12", room: "Пушкина 1118", web: "", avatar: '', email: "okpr@guap.ru", type: "Заведующий" },
            { id: 412, mode: 2, name: "Штаб гражданской обороны", director: "Штаб гражданской обороны", phone: "+7 (812) 315-54-29", room: "Пушкина 1126", web: "", avatar: '', email: "" },
        ],
        iddir: 4, director: "Павлов Игорь Александрович", phone: "+7 (812) 710-62-87", room: "Пушкина 1222", avatar: "https://pro.guap.ru/files/img/exsamle/picture-1048-1447744234.jpg", type: "Проректор по административной работе и режиму",
        web: "",
        email: "pavlov@guap.ru"
    },
    {
        id: 5, mode: 2, name: "Департамент экономики и финансов", pulpits: [
            { id: 51, mode: 2, name: "Финансово-экономическое управление", director: "Киселева Анна Владимировна", phone: "+7 (812) 494-70-17", room: "Пушкина 1324", web: "http://portal.guap.ru/?n=depef", avatar: '', email: "", type: "Заведующий" },
            { id: 52, mode: 2, name: "Управление бухгалтерского учета и финансового контроля", director: "Ефимова Татьяна Владимировна", phone: "+7 (812) 710-65-40", room: "Пушкина 1340", web: "http://portal.guap.ru/?n=depef", avatar: '', email: "etv@guap.ru", type: "Заведующий" },
            { id: 53, mode: 2, name: "Отдел по обеспечению управления имущественным комплексом", director: "Писклова Ирина Илфаковна", phone: "+7 (812) 570-13-35", room: "Пушкина 1322", web: "http://portal.guap.ru/?n=depef", avatar: '', email: "oouik@guap.ru", type: "Заведующий" },
        ],
        iddir: 5, director: "Антохина Юлия Анатольевна", phone: "+7 (812) 710-65-10", room: "Пушкина 1328", avatar: '', type: "Ректор",
        web: "http://portal.guap.ru/?n=depef",
        email: "antoxina@guap.ru"
    },
    {
        id: 6, mode: 2, name: "Департамент развития университетского комплекса", pulpits: [
            { id: 61, mode: 2, name: "Управление капитального ремонта и эксплуатации зданий", director: "Тимофеева Любовь Александровна", phone: "+7 (812) 312-87-67", room: "Пушкина", web: "", avatar: '', email: "druk@guap.ru", type: "Заведующий" },
            { id: 62, mode: 2, name: "Отдел главного инженера", director: "Довгенко Игорь Андреевич", phone: "+7 (812) 312-87-67", room: "Пушкина 1226а", web: "", avatar: '', email: "", type: "Заведующий" },
            { id: 63, mode: 2, name: "Ремонтно-строительный отдел", director: "Иванников Сергей Владимирович", phone: "+7 (812) 494-70-62", room: "Пушкина 5110", web: "", avatar: '', email: "", type: "Заведующий" },
            { id: 64, mode: 2, name: "Отдел главного энергетика", director: "Кутузов Константин Юрьевич", phone: "+7 (812) 571-10-34", room: "Пушкина 1225а", web: "", avatar: '', email: "", type: "Заведующий" },
            { id: 65, mode: 2, name: "Отдел главного механика", director: "Радионов Николай Анатольевич", phone: "+7 (812) 494-70-08", room: "Пушкина 3101", web: "", avatar: '', email: "", type: "Заведующий" },
            { id: 66, mode: 2, name: "Технический отдел", director: "Басова Ирина Валентиновна", phone: "+7 (812) 494-70-98", room: "Пушкина 1221а", web: "", avatar: '', email: "", type: "Заведующий" },
            { id: 67, mode: 2, name: "Отдел эксплуатации автотранспорта", director: "Бережной Александр Вячеславович", phone: "+7 (812) 315-18-85", room: "Пушкина 2123", web: "", avatar: '', email: "", type: "Заведующий" },
            { id: 68, mode: 2, name: "Отдел текущего обслуживания", director: "Никитинская Юлиана Андреевна", phone: "+7 (812) 710-64-46", room: "Пушкина 1111", web: "", avatar: '', email: "", type: "Заведующий" },
            { id: 69, mode: 2, name: "Отдел безопасности и охраны труда", director: "Комягина Юлия Андреевна", phone: "+7 (812) 494-70-59", room: "Пушкина 1224а", web: "", avatar: '', email: "obiot@guap.ru", type: "Заведующий" },
        ],
        iddir: 6, director: "Пешкова Галина Юрьевна", phone: "+7 (812) 312-87-67", room: "Пушкина 1225", avatar: "https://pro.guap.ru/files/img/exsamle/picture-1416-1444220330.jpg", type: "Проректор по развитию университетского комплекса",
        web: "",
        email: ""
    },

];
const Faculties = [
    {
        id: 1, mode: 1, name: "Институт аэрокосмических приборов и систем", pulpits: [
            { id: 11, mode: 1, name: "Кафедра аэрокосмических измерительно-вычислительных комплексов", director: "Небылов Александр Владимирович", phone: "+7 (812) 494-70-11", room: "Пушкина 1318", web: "http://new.guap.ru/i01/k11", avatar: "http://media.guap.ru/1021/nebylov_av.jpg?s=xs", email: "nebylov@aanet.ru", type: "Заведующий" },
            { id: 12, mode: 1, name: "Кафедра системного анализа и логистики", director: "Фетисов Владимир Андреевич", phone: "+7 (812) 315-49-67", room: "Пушкина 1306", web: "http://new.guap.ru/i01/k12", avatar: "http://media.guap.ru/1021/fetisov_va.jpg?s=xs", email: "fet1@aanet.ru", type: "Заведующий" },
            { id: 13, mode: 1, name: "Кафедра эксплуатации и управления аэрокомическими системами", director: "Ковалев Александр Павлович", phone: "+7 (812) 570-65-99", room: "Пушкина 1301", web: "http://new.guap.ru/i01/k13", avatar: "http://media.guap.ru/1021/kovalev_ap.jpg?s=xs", email: "sergey_burluckiy@mail.ru", type: "Заведующий" },
            { id: 14, mode: 1, name: "Кафедра аэрокосмических компьютерных и программных систем", director: "Шейнин Юрий Евгеньевич", phone: "+7 (812) 710-62-34", room: "Пушкина 5233", web: "http://new.guap.ru/i01/k14", avatar: "http://media.guap.ru/1021/sheinin_yue.jpg?s=xs", email: "info@k14.spb.ru", type: "Заведующий" },
        ],
        iddir: 1, director: "Фетисов Владимир Андреевич", phone: "+7 (812) 571-16-89", room: "Пушкина 5214", avatar: "http://media.guap.ru/1021/fetisov_va.jpg?s=xs", type: "Директор",
        deputies: [
            { idd: 1, name: "Пятлина Елена Олеговна", phone: "+7 (812) 708-39-43", room: "Колотушкина 1306", type: "По младшим курсам" },
            { idd: 2, name: "Майоров Николай Николаевич", phone: "+7 (812) 571-16-89", room: "Пушкина 5214", type: "По старшим курсам" },
        ],
        web: "http://new.guap.ru/i01",
        email: "aerospace1@guap.ru"
    },
    {
        id: 2, mode: 1, name: "Институт радиотехники, электроники и связи", pulpits: [
            { id: 21, mode: 1, name: "Кафедра радиотехнических и оптоэлектронных комплексов", director: "Крячко Александр Федотович", phone: "+7 (812) 494-70-23", room: "Пушкина 5257", web: "http://new.guap.ru/i02/k21", avatar: "http://media.guap.ru/1038/kryachko_af.jpg?s=xs", email: "kaf21@aanet.ru", type: "Заведующий" },
            { id: 22, mode: 1, name: "Кафедра радиотехнических систем", director: "Король Виктор Михайлович", phone: "+7 (812) 494-70-22", room: "Пушкина 2204", web: "http://new.guap.ru/i02/k22", avatar: "http://media.guap.ru/1038/povarenkin_nv.jpg?s=xs", email: "guap22@mail.ru", type: "Заведующий" },
            { id: 23, mode: 1, name: "Кафедра конструирования и технологий электронных и лазерных средств", director: "Бестугин Александр Роальдович", phone: "+7 (812) 494-70-14", room: "Пушкина 1406", web: "http://new.guap.ru/i02/k23", avatar: "http://media.guap.ru/1038/bestugin_ar.jpg?s=xs", email: "kaf23@guap.ru", type: "Заведующий" },
            { id: 24, mode: 1, name: "Кафедра медицинской радиоэлектроники", director: "Зайченко Кирилл Вадимович", phone: "+7 (812) 494-70-24", room: "Пушкина 1452", web: "http://new.guap.ru/i02/k24", avatar: "http://media.guap.ru/1038/tihonenkova_ov.jpg?s=xs", email: "kvz_k41@aanet.ru", type: "Заведующий" },
        ],
        iddir: 2, director: "Бестугин Александр Роальдович", phone: "+7 (812) 571-19-89", room: "Пушкина 5236", avatar: "http://media.guap.ru/1038/bestugin_ar.jpg?s=xs", type: "Директор",
        deputies: [
            { idd: 3, name: "Рогачева Галина Георгиевна", phone: "+7 (812) 371-64-35", room: "Колотушкина 1305", type: "По младшим курсам" },
            { idd: 4, name: "Киршина Ирина Анатольевна", phone: "+7 (812) 571-19-89", room: "Пушкина 5236", type: "По старшим курсам" },
        ],
        web: "http://new.guap.ru/i02",
        email: "fresguap@mail.ru"
    },
    {
        id: 3, mode: 1, name: "Институт инновационных технологий в электромеханике и робототехнике", pulpits: [
            { id: 31, mode: 1, name: "Кафедра управления в технических системах", director: "Шишлаков Владислав Федорович", phone: "+7 (812) 494-70-31", room: "Пушкина 2114", web: "http://new.guap.ru/i03/k31", avatar: "http://media.guap.ru/1039/shishlakov_vf.jpg?s=xs", email: "kaf31guap@gmail.com", type: "Заведующий" },
            { id: 32, mode: 1, name: "Кафедра электромеханики и робототехники", director: "Ронжин Андрей Леонидович", phone: "+7 (812) 494-70-34", room: "Пушкина 2120", web: "http://new.guap.ru/i03/k32", avatar: "http://media.guap.ru/1039/ronzhin.jpg?s=xs", email: "kaf32@guap.ru", type: "Заведующий" },
            { id: 33, mode: 1, name: "Кафедра программно-целевого управления в приборостроении", director: "Шишлаков Владислав Федорович", phone: "+7 (812) 494-70-31", room: "Пушкина 2110", web: "http://new.guap.ru/i03/k33", avatar: "http://media.guap.ru/1039/shishlakov_vf.jpg?s=xs", email: "kafedra33@guap.ru", type: "Заведующий" },
            { id: 34, mode: 1, name: "Кафедра технологий защиты информации", director: "Беззатеев Сергей Валентинович", phone: "+7 (812) 494-70-77", room: "Пушкина 1442", web: "http://new.guap.ru/i03/k34", avatar: "http://media.guap.ru/1039/bezzateev_sv.jpg?s=xs", email: "contacts@isecurity.spb.ru", type: "Заведующий" },
        ],
        iddir: 3, director: "Шишлаков Владислав Федорович", phone: "+7 (812) 494-70-31", room: "Пушкина 2117", avatar: "http://media.guap.ru/1039/shishlakov_vf.jpg?s=xs", type: "Директор",
        deputies: [
            { idd: 5, name: "Зубкова Анна Николаевна", phone: "+7 (812) 708-39-33", room: "Колотушкина 1306", type: "По младшим курсам" },
            { idd: 6, name: "Волохов Михаил Александрович", phone: "+7 (812) 494-70-30", room: "Пушкина 2117", type: "По старшим курсам" },
        ],
        web: "http://new.guap.ru/i03",
        email: "dept3@aanet.ru"
    },
    {
        id: 4, mode: 1, name: "Институт вычислительных систем и программирования", pulpits: [
            { id: 41, mode: 1, name: "Кафедра проблемно-ориентированных вычислительных комплексов", director: "Коржавин Георгий Анатольевич", phone: "+7 (812) 494-70-41", room: "Пушкина 2216", web: "http://new.guap.ru/i04/k41", avatar: "http://media.guap.ru/1039/shishlakov_vf.jpg?s=xs", email: "dept4@aanet.ru", type: "Заведующий" },
            { id: 43, mode: 1, name: "Кафедра компьютерных технологий и программной инженерии", director: "Охтилев Михаил Юрьевич", phone: "+7 (812) 494-70-43", room: "Пушкина 2312", web: "http://new.guap.ru/i04/k43", avatar: "http://media.guap.ru/1040/ohtilev_myu.jpg?s=xs", email: "k43@guap.ru", type: "Заведующий" },
            { id: 44, mode: 1, name: "Кафедра вычислительных систем и сетей", director: "Сергеев Михаил Борисович", phone: "+7 (812) 494-70-44", room: "Пушкина 2212", web: "http://new.guap.ru/i04/k44", avatar: "http://media.guap.ru/1040/sergeev_mb.jpg?s=xs", email: "kaf44@guap.ru", type: "Заведующий" },
        ],
        iddir: 4, director: "Сергеев Михаил Борисович", phone: "+7 (812) 312-24-14", room: "Пушкина 5236_1", avatar: "http://media.guap.ru/1040/sergeev_mb.jpg?s=xs", type: "Директор",
        deputies: [
            { idd: 7, name: "Пятлина Елена Олеговна", phone: "+7 (812) 708-39-43", room: "Колотушкина 1306", type: "По младшим курсам" },
            { idd: 8, name: "Исаков Виктор Иванович", phone: "+7 (812) 312-24-14", room: "Пушкина 5236_1", type: "По старшим курсам" },
        ],
        web: "http://new.guap.ru/i04",
        email: "dept4@aanet.ru"
    },
    {
        id: 5, mode: 1, name: "Институт информационных систем и защиты информации", pulpits: [
            { id: 51, mode: 1, name: "Кафедра безопасности информационных систем", director: "Овчинников Андрей Анатольевич", phone: "+7 (812) 494-70-52", room: "Пушкина 1449", web: "http://new.guap.ru/i05/k51", avatar: "http://media.guap.ru/1041/ovchinnikov_aa.jpg?s=xs", email: "kaf51@vu.spb.ru", type: "Заведующий" },
            { id: 52, mode: 1, name: "Кафедра инфокоммуникационных систем", director: "Тюрликов Андрей Михайлович", phone: "+7 (812) 494-70-52", room: "Пушкина 1448", web: "http://new.guap.ru/i05/k52", avatar: "http://media.guap.ru/1041/turlikov_am.jpg?s=xs", email: "k52.info@vu.spb.ru", type: "Заведующий" },
            { id: 53, mode: 1, name: "Кафедра информационно-сетевых технологий", director: "Осипов Леонид Андроникович", phone: "+7 (812) 494-70-53", room: "Пушкина 3303", web: "http://new.guap.ru/i05/k53", avatar: "http://media.guap.ru/1041/michurin_sv.jpg?s=xs", email: "kaf53@guap.ru", type: "Заведующий" },
        ],
        iddir: 5, director: "Тюрликов Андрей Михайлович", phone: "+7 (812) 571-21-60", room: "Пушкина 5214_1", avatar: "http://media.guap.ru/1041/turlikov_am.jpg?s=xs", type: "Директор",
        deputies: [
            { idd: 9, name: "Рогачева Галина Георгиевна", phone: "+7 (812) 371-64-35", room: "Колотушкина 1305", type: "По младшим курсам" },
            { idd: 10, name: "Жуков Алексей Дмитриевич", phone: "+7 (812) 571-21-60", room: "Пушкина 5214", type: "По старшим курсам" },
        ],
        web: "http://new.guap.ru/i05",
        email: "az@aanet.ru"
    },
    {
        id: 6, mode: 1, name: "Институт фундаментальной подготовки и технологических инноваций", pulpits: [
            { id: 1, mode: 1, name: "Кафедра высшей математики и механики", director: "Смирнов Александр Олегович", phone: "+7 (812) 371-91-73", room: "Колотушкина 2413", web: "http://new.guap.ru/iibmp/k01", avatar: "http://media.guap.ru/1042/smirnov_ao.jpg?s=xs", email: "alsmir@guap.ru", type: "Заведующий" },
            { id: 2, mode: 1, name: "Кафедра прикладной математики", director: "Фарафонов Виктор Георгиевич", phone: "+7 (812) 708-42-12", room: "Колотушкина 2202", web: "http://new.guap.ru/iibmp/k02", avatar: "http://media.guap.ru/1042/farafonov_vg.jpg?s=xs", email: "farvg@mail.ru", type: "Заведующий" },
            { id: 3, mode: 1, name: "Кафедра физики", director: "Коваленко Иван Иванович", phone: "+7 (812) 373-72-65", room: "Колотушкина 3208", web: "http://new.guap.ru/iibmp/k03", avatar: "http://media.guap.ru/1042/kovalenko_ii.jpg?s=xs", email: "physics@guap.ru", type: "Заведующий" },
            { id: 5, mode: 1, name: "Кафедра инноватики и интегрированных систем качества", director: "Семенова Елена Георгиевна", phone: "+7 (812) 494-70-55", room: "Пушкина 2323", web: "http://new.guap.ru/iibmp/k05", avatar: "http://media.guap.ru/1042/semenova_eg_2.jpg?s=xs", email: "dek_ibmp@guap.ru", type: "Заведующий" },
            { id: 6, mode: 1, name: "Кафедра метрологического обеспечения инновационных технологий и промышленной безопасности", director: "Окрепилов Владимир Валентинович", phone: "+7 (812) 494-70-75", room: "Пушкина 5235а", web: "http://new.guap.ru/iibmp/k06", avatar: "http://media.guap.ru/1042/okrepilov_vv.jpg?s=xs", email: "metro-guap@yandex.ru", type: "Заведующий" },
        ],
        iddir: 6, director: "Семенова Елена Георгиевна", phone: "+7 (812) 494-70-69", room: "Пушкина 2320", avatar: "http://media.guap.ru/1042/semenova_eg.jpg?s=xs", type: "Директор",
        deputies: [
            { idd: 11, name: "Лукьяненко Ирина Николаевна", phone: "+7 (812) 708-39-33", room: "Колотушкина 1301", type: "По младшим курсам" },
        ],
        web: "http://new.guap.ru/iibmp",
        email: "dek_ibmp@guap.ru"
    },
    {
        id: 7, mode: 1, name: "Гуманитарный факультет", pulpits: [
            { id: 61, mode: 1, name: "Кафедра истории и философии", director: "Гуcман Леонид Юрьевич", phone: "+7 (812) 708-42-05", room: "Колотушкина ", web: "http://hf-guap.ru/hiph", avatar: "https://pro.guap.ru/files/img/exsamle/picture-588-1444336380.jpg", email: "hiph@hf-guap.ru", type: "Заведующий" },
            { id: 62, mode: 1, name: "Кафедра рекламы и современных коммуникаций", director: "Лосев Константин Викторович", phone: "+7 (812) 708-42-13", room: "Колотушкина ", web: "http://hf-guap.ru/intercom", avatar: "http://guap.info/wp-content/uploads/2015/09/K_Losev1.jpg", email: "intercom@hf-guap.ru", type: "Заведующий" },
            { id: 63, mode: 1, name: "Кафедра иностранных языков", director: "Чиханова Марина Анатольевна", phone: "+7 (812) 708-42-01", room: "Колотушкина ", web: "http://hf-guap.ru/foreign", avatar: "https://pro.guap.ru/files/img/exsamle/picture-653-1444577924.jpg", email: "foreign@hf-guap.ru", type: "Заведующий" },
            { id: 64, mode: 1, name: "Кафедра физической культуры и спорта", director: "Башкин Виктор Михайлович", phone: "+7 (812) 571-23-74", room: "Пушкина Спортивный зал", web: "http://hf-guap.ru/sport", avatar: "https://pro.guap.ru/files/img/exsamle/picture-658-1382450221.jpg", email: "sport@hf-guap.ru", type: "Заведующий" },
        ],
        iddir: 7, director: "Лосев Константин Викторович", phone: "+7 (812) 494-70-61", room: "Пушкина 5306", avatar: "http://guap.info/wp-content/uploads/2015/09/K_Losev1.jpg", type: "Декан",
        deputies: [
            { idd: 12, name: "Гуcман Леонид Юрьевич", phone: "+7 (812) 708-43-45", room: "Колотушкина 1407", type: "По младшим курсам" },
            { idd: 13, name: "Евдокимов Иван Михайлович", phone: "+7 (812) 317-11-20", room: "Пушкина 5306", type: "По старшим курсам" },
        ],
        web: "http://hf-guap.ru",
        email: "secretatiat@hf-guap.ru"
    },
    {
        id: 8, mode: 1, name: "Институт военного образования",
        iddir: 8, director: "Павлов Игорь Александрович", phone: "+7 (812) 571-08-26", room: "Пушкина 5101", avatar: "http://media.guap.ru/1043/pavlov_ia.jpg?s=xs", type: "Директор",
        deputies: [
            { idd: 14, name: "Третьяков Николай Николаевич", phone: "+7 (812) 494-70-71", room: "Колотушкина 5118", type: "Начальник УВЦ университета" },
            { idd: 15, name: "Скуратов Вадим Вячеславович", phone: "+7 (812) 494-70-72", room: "Пушкина 5122", type: "Начальник военной кафедры университета" },
        ],
        web: "http://new.guap.ru/ivo",
        email: "ivo@guap.ru"
    },
    {
        id: 9, mode: 1, name: "Институт технологий предпринимательства", pulpits: [
            { id: 81, mode: 1, name: "Кафедра экономики высокотехнологичных производств", director: "Власова Виктория Михайловна", phone: "+7 (812) 571-24-90", room: "Пушкина ", web: "http://new.guap.ru/i08/k81", avatar: "http://media.guap.ru/1004/vlasova_vm.jpg?s=xs", email: "uni-dep81@yandex.ru", type: "Заведующий" },
            { id: 82, mode: 1, name: "Кафедра информационных технологий предпринимательства", director: "Будагов Артур Суренович", phone: "+7 (812) 315-50-47", room: "Пушкина ", web: "http://new.guap.ru/i08/k82", avatar: "http://media.guap.ru/1004/budagov_as.jpg?s=xs", email: "milutina@aanet.ru", type: "Заведующий" },
            { id: 83, mode: 1, name: "Кафедра международного предпринимательства", director: "Оводенко Анатолий Аркадьевич", phone: "+7 (812) 494-70-83", room: "Пушкина 2313", web: "http://new.guap.ru/i08/k83", avatar: "http://media.guap.ru/1004/ovodenko_aa.jpg?s=xs", email: "kaf83@aanet.ru", type: "Заведующий" },
            { id: 84, mode: 1, name: "Кафедра безопасности высокотехнологичных систем", director: "Самойлов Александр Васильевич", phone: "+7 (812) 494-70-86", room: "Пушкина ", web: "http://new.guap.ru/i08/k84", avatar: "http://media.guap.ru/1004/samoilov_av.jpg?s=xs", email: "guapkaf86@mail.ru", type: "Заведующий" },
            { id: 85, mode: 1, name: "Кафедра менеджмента наукоемких производств", director: "Сиротки Владислав Борисович", phone: "+7 (812) 312-50-75", room: "Пушкина ", web: "http://new.guap.ru/i08/k85", avatar: "http://media.guap.ru/1004/sirotkin_vb.jpg?s=xs", email: "juli_ko@list.ru", type: "Заведующий" },
        ],
        iddir: 9, director: "Будагов Артур Суренович", phone: "+7 (812) 315-50-47", room: "Пушкина 5254", avatar: "http://media.guap.ru/1004/budagov_as.jpg?s=xs", type: "Директор",
        deputies: [
            { idd: 16, name: "Устюжанина Ирина Александровна", phone: "+7 (812) 371-94-86", room: "Ленина 1218", type: "По младшим курсам" },
            { idd: 17, name: "Царев Юрий Николаевич", phone: "+7 (812) 708-39-48", room: "Ленина 1220", type: "По старшим курсам" },
            { idd: 18, name: "Степанов Александр Георгиевич", phone: "+7 (812) 373-78-60", room: "Ленина 2408", type: "По научной работе и магистратуре" },
        ],
        web: "http://new.guap.ru/i08",
        email: "dean8@aanet.ru"
    },
    {
        id: 10, mode: 1, name: "Юридический факультет", pulpits: [
            { id: 91, mode: 1, name: "Кафедра теории права и государства", director: "Кузнецов Эдуард Вениаминович", phone: "+7 (812) 373-09-45", room: "Ленина 3210", web: "http://new.guap.ru/f09/k91", avatar: "http://media.guap.ru/1044/kuznetsov_ev.jpg?s=xs", email: "kaf91@guap.ru", type: "Заведующий" },
            { id: 92, mode: 1, name: "Кафедра гражданского права", director: "Боер Анна Александровна", phone: "+7 (812) 708-59-04", room: "Ленина 3206", web: "http://new.guap.ru/f09/k92", avatar: "http://media.guap.ru/1044/boer_aa.jpg?s=xs", email: "kaf92@guap.ru", type: "Заведующий" },
            { id: 93, mode: 1, name: "Кафедра уголовного права и таможенных расследований", director: "Сафин Фярит Юсупович", phone: "+7 (812) 708-59-04", room: "Ленина 3207", web: "http://new.guap.ru/f09/k93", avatar: "http://media.guap.ru/1044/safin_fyu.jpg?s=xs", email: "kaf93@guap.ru", type: "Заведующий" },
            { id: 94, mode: 1, name: "Кафедра государственного права", director: "Лойт Хиллар Харриевич", phone: "+7 (812) 373-09-45", room: "Ленина 3205", web: "http://new.guap.ru/f09/k94", avatar: "http://media.guap.ru/1044/loit_hh.jpg?s=xs", email: "kaf94@guap.ru", type: "Заведующий" },
            { id: 95, mode: 1, name: "Кафедра международного и таможенного права", director: "Цмай Василий Васильевич", phone: "+7 (812) 373-09-45", room: "Ленина 3209", web: "http://new.guap.ru/f09/k95", avatar: "http://media.guap.ru/1044/tsmai_vv.jpg?s=xs", email: "kaf95@guap.ru", type: "Заведующий" },
            { id: 96, mode: 1, name: "Кафедра правоведения и таможенного дела", director: "Боер Виктор Матвеевич", phone: "+7 (812) 373-09-45", room: "Ленина 3208", web: "http://new.guap.ru/f09/k96", avatar: "http://media.guap.ru/1044/boer_vm.jpg?s=xs", email: "kaf96@guap.ru", type: "Заведующий" },
        ],
        iddir: 10, director: "Боер Виктор Матвеевич", phone: "+7 (812) 312-67-14", room: "Пушкина 5234", avatar: "http://media.guap.ru/1044/boer_vm.jpg?s=xs", type: "Декан",
        deputies: [
            { idd: 19, name: "Сафин Фярит Юсупович", phone: "+7 (812) 373-09-45", room: "Ленина 3207", type: "Первый заместитель декана" },
            { idd: 20, name: "Долбик Наталья Федоровна", phone: "+7 (812) 373-09-54", room: "Ленина 3203", type: "По младшим курсам" },
            { idd: 21, name: "Домбровский Владимир Васильевич", phone: "+7 (812) 373-64-12", room: "Ленина 1122", type: "По специальности 'Таможенное дело'" },
            { idd: 22, name: "Боер Анна Александровна", phone: "+7 (812) 317-32-71", room: "Ленина 1121", type: "По среднему профессиональному образованию" },
        ],
        web: "http://new.guap.ru/f09",
        email: "boer@guap.ru"
    },
    {
        id: 11, mode: 1, name: "Институт непрерывного и дистанционного образования",
        iddir: 11, director: "Мичурин Сергей Владимирович", phone: "+7 (812) 312-21-07", room: "Пушкина 5248", avatar: "http://media.guap.ru/1045/michurin_sv.jpg?s=xs", type: "Директор",
        deputies: [
            { idd: 23, name: "Заместитель", phone: "+7 (812) 708-42-18", room: "Колотушкина 1413", type: "По младшим курсам" },
            { idd: 23, name: "Заместитель", phone: "+7 (812) 312-46-57", room: "Пушкина 5248", type: "По старшим курсам" },
        ],
        web: "http://new.guap.ru/indo",
        email: "iodo@guap.ru"
    },
    {
        id: 12, mode: 1, name: "Факультет среднего профессионального образования",
        iddir: 12, director: "Чернова Наталия Алексеевна", phone: "+7 (812) 387-48-88", room: "Моск. 312", avatar: "http://media.guap.ru/1047/chernova_na.jpg?s=xs", type: "Декан",
        web: "http://new.guap.ru/fspo",
        email: "aviacollege@guap.ru"
    },
    {
        id: 13, mode: 1, name: "Ивангородский гуманитарно-технический институт (филиал)", pulpits: [
            { id: 101, mode: 1, name: "Кафедра социально-экономических наук и внешнеэкономической деятельности", director: "Окрепилов Владимир  Валентинович", phone: "+7 (81375) 5-13-14", room: "Кингисеппский р-н, Ивангород, ул. Котовского, д. 1", web: "http://ifguap.ru", avatar: "https://pro.guap.ru/files/img/exsamle/picture-581-1381219200.jpg", email: "nmc@ifguap.ru", type: "Заведующий" },
            { id: 102, mode: 1, name: "Кафедра прикладной математики, информатики и информационных таможенных технологий", director: "Яковлева Екатерина Арнольдовна", phone: "+7 (81375) 5-13-34", room: "Кингисеппский р-н, Ивангород, ул. Котовского, д. 1", web: "http://ifguap.ru", avatar: "https://pro.guap.ru/files/img/exsamle/8702/2viBb2lzIx8%20-%20копия.jpg", email: "fet1@aanet.ru", type: "Заведующий" },
            { id: 103, mode: 1, name: "Кафедра государственного, международного и таможенного права", director: "Лысенко Валерий Владимирович", phone: "+7 (81375) 5-13-34", room: "Кингисеппский р-н, Ивангород, ул. Котовского, д. 1", web: "http://ifguap.ru", avatar: "https://pro.guap.ru/files/img/exsamle/8725/lysenko.jpg", email: "sergey_burluckiy@mail.ru", type: "Заведующий" },
            { id: 104, mode: 1, name: "Кафедра гражданского права и процесса", director: "Евшин Александр Георгиевич", phone: "+7 (81375) 5-13-34", room: "Кингисеппский р-н, Ивангород, ул. Котовского, д. 1", web: "http://ifguap.ru", avatar: "https://pro.guap.ru/files/img/exsamle/picture-1192-1463752269.jpg", email: "info@k14.spb.ru", type: "Заведующий" },
            { id: 105, mode: 1, name: "Кафедра уголовного права и таможенных расследований", director: "Городинец Федор Михайлович", phone: "+7 (81375) 5-13-34", room: "Кингисеппский р-н, Ивангород, ул. Котовского, д. 1", web: "http://ifguap.ru", avatar: "https://pro.guap.ru/files/img/exsamle/picture-826-1382442486.jpg", email: "info@k14.spb.ru", type: "Заведующий" },
            { id: 106, mode: 1, name: "Кафедра правоведения и таможенного права", director: "Федоров Валерий Петрович", phone: "+7 (81375) 5-13-34", room: "Кингисеппский р-н, Ивангород, ул. Котовского, д. 1", web: "http://ifguap.ru", avatar: "", email: "info@k14.spb.ru" },
        ],
        iddir: 13, director: "Евшин Александр Георгиевич", phone: "+7 (81375) 5-21-59", room: "Кингисеппский р-н, Ивангород, ул. Котовского, д. 1", avatar: "https://pro.guap.ru/files/img/exsamle/picture-1192-1463752269.jpg", type: "Директор",
        web: "http://ifguap.ru",
        email: "ifguap@ifguap.ru"
    },
];

export { Departments, Faculties }