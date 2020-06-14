const ScheduleArray = [
    {"ItemId":2828,"Week":1,"Day":1,"Less":6,"Build":"Б.М.","Rooms":"32-03","Disc":"Экспертные системы","Type":"Л","Groups":":232::233::220::248:","GroupsText":"4631; 4632; 4636; М611","Preps":":288:","PrepsText":"Охтилев М.Ю. — заведующий кафедрой, д-р техн. наук, профессор","Dept":null},
    {"ItemId":2829,"Week":2,"Day":1,"Less":6,"Build":"Б.М.","Rooms":"32-03","Disc":"Экспертные системы","Type":"Л","Groups":":232::233::220::248:","GroupsText":"4631; 4632; 4636; М611","Preps":":288:","PrepsText":"Охтилев М.Ю. — заведующий кафедрой, д-р техн. наук, профессор","Dept":null},
    {"ItemId":2830,"Week":2,"Day":4,"Less":4,"Build":"Б.М.","Rooms":"23-09","Disc":"Экспертные системы","Type":"ЛР","Groups":":248:","GroupsText":"М611","Preps":":260:","PrepsText":"Рогачев С.А. — старший преподаватель","Dept":null},{"ItemId":2831,"Week":1,"Day":4,"Less":5,"Build":"Б.М.","Rooms":"23-09","Disc":"Экспертные системы","Type":"ЛР","Groups":":248:","GroupsText":"М611","Preps":":260:","PrepsText":"Рогачев С.А. — старший преподаватель","Dept":null},
    {"ItemId":2832,"Week":2,"Day":4,"Less":5,"Build":"Б.М.","Rooms":"23-09","Disc":"Экспертные системы","Type":"ЛР","Groups":":248:","GroupsText":"М611","Preps":":260:","PrepsText":"Рогачев С.А. — старший преподаватель","Dept":null},{"ItemId":3087,"Week":1,"Day":6,"Less":4,"Build":"Б.М.","Rooms":"53-07","Disc":"Защита информации","Type":"Л","Groups":":101::232::233::220::248:","GroupsText":"2741; 4631; 4632; 4636; М611","Preps":":311:","PrepsText":"Коломойцев В.С. — старший преподаватель","Dept":null},
    {"ItemId":3088,"Week":2,"Day":1,"Less":2,"Build":"Б.М.","Rooms":"52-49","Disc":"Защита информации","Type":"ЛР","Groups":":248:","GroupsText":"М611","Preps":":315:","PrepsText":"Бакай К.А. — старший преподаватель","Dept":null},{"ItemId":7094,"Week":2,"Day":3,"Less":2,"Build":"Гаст.","Rooms":"24-12","Disc":"Нелинейные модели","Type":"Л","Groups":":248:","GroupsText":"М611","Preps":":642:","PrepsText":"Дик О.Е. — доцент, д-р биол. наук","Dept":null},{"ItemId":7095,"Week":1,"Day":3,"Less":3,"Build":"Гаст.","Rooms":"12-06","Disc":"Нелинейные модели","Type":"Л","Groups":":248:","GroupsText":"М611","Preps":":642:","PrepsText":"Дик О.Е. — доцент, д-р биол. наук","Dept":null},
    {"ItemId":7096,"Week":1,"Day":3,"Less":1,"Build":"Гаст.","Rooms":"24-12","Disc":"Нелинейные модели","Type":"ЛР","Groups":":248:","GroupsText":"М611","Preps":":642:","PrepsText":"Дик О.Е. — доцент, д-р биол. наук","Dept":null},{"ItemId":7097,"Week":2,"Day":3,"Less":1,"Build":"Гаст.","Rooms":"24-12","Disc":"Нелинейные модели","Type":"ЛР","Groups":":248:","GroupsText":"М611","Preps":":642:","PrepsText":"Дик О.Е. — доцент, д-р биол. наук","Dept":null},{"ItemId":7098,"Week":1,"Day":3,"Less":2,"Build":"Гаст.","Rooms":"24-12","Disc":"Нелинейные модели","Type":"ЛР","Groups":":248:","GroupsText":"М611","Preps":":642:","PrepsText":"Дик О.Е. — доцент, д-р биол. наук","Dept":null},{"ItemId":7660,"Week":1,"Day":2,"Less":2,"Build":"Б.М.","Rooms":"54-01","Disc":"Защита интеллектуальной собственности","Type":"Л","Groups":":248:","GroupsText":"М611","Preps":":696:","PrepsText":"Рабин А.В. — доцент, канд. техн. нау","Dept":null},{"ItemId":7661,"Week":1,"Day":1,"Less":5,"Build":"Б.М.","Rooms":"53-04","Disc":"Защита интеллектуальной собственности","Type":"ПР","Groups":":248:","GroupsText":"М611","Preps":":697:","PrepsText":"Петрушевская А.А. — ассистент","Dept":null},{"ItemId":7662,"Week":2,"Day":1,"Less":5,"Build":"Б.М.","Rooms":"14-03","Disc":"Защита интеллектуальной собственности","Type":"ПР","Groups":":248:","GroupsText":"М611","Preps":":697:","PrepsText":"Петрушевская А.А. — ассистент","Dept":null},{"ItemId":7821,"Week":1,"Day":4,"Less":3,"Build":"Б.М.","Rooms":"54-01","Disc":"Основы технического анализа промышленной продукции","Type":"Л","Groups":":248:","GroupsText":"М611","Preps":":687:","PrepsText":"Назаревич С.А. — доцент, канд. техн. нау, доцент","Dept":null},{"ItemId":7822,"Week":2,"Day":4,"Less":3,"Build":"Б.М.","Rooms":"54-01","Disc":"Основы технического анализа промышленной продукции","Type":"ПР","Groups":":248:","GroupsText":"М611","Preps":":687:","PrepsText":"Назаревич С.А. — доцент, канд. техн. нау, доцент","Dept":null},{"ItemId":7960,"Week":1,"Day":1,"Less":4,"Build":"Б.М.","Rooms":"54-01","Disc":"Управление инновационными проектами","Type":"Л","Groups":":248::445:","GroupsText":"М611; М650","Preps":":646:","PrepsText":"Курлов В.В. — доцент, канд. техн. нау, доцент","Dept":null},{"ItemId":7961,"Week":2,"Day":1,"Less":4,"Build":"Б.М.","Rooms":"54-01","Disc":"Управление инновационными проектами","Type":"Л","Groups":":248::445:","GroupsText":"М611; М650","Preps":":646:","PrepsText":"Курлов В.В. — доцент, канд. техн. нау, доцент","Dept":null},{"ItemId":7962,"Week":0,"Day":0,"Less":0,"Build":null,"Rooms":null,"Disc":"Управление инновационными проектами","Type":"КР","Groups":":248:","GroupsText":"М611","Preps":null,"PrepsText":"","Dept":"Кафедра 5"},{"ItemId":7963,"Week":2,"Day":1,"Less":3,"Build":"Б.М.","Rooms":"52-49","Disc":"Управление инновационными проектами","Type":"ПР","Groups":":248:","GroupsText":"М611","Preps":":646:","PrepsText":"Курлов В.В. — доцент, канд. техн. нау, доцент","Dept":null}]
export {ScheduleArray}