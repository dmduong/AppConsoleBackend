const Handlebar = require('handlebars');

module.exports = {
    sum(a, b) { return a + b; },
    sortable: (field, sort) => {

        //Kiểm tra coi cái icon chúng ta đang bấm ở cột nào, đển hiện mỗi một nơi đó.
        const sorttype = field === sort.column ? sort.type : 'default';

        const icons = {
            default: 'fa-solid fa-sort',
            asc: 'fa-solid fa-sort-up',
            desc: 'fa-solid fa-sort-down',
        }

        // Chuyển đỗi cái type khi sort
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc'
        }

        const type = types[sort.type];

        // Chuyển đổi icon khi thay đổi sort.
        const ison = icons[sorttype];

        //Bảo vệ đoạn link khi hiển thị trên views
        const hrf = Handlebar.escapeExpression(`?_sort&column=${field}&type=${type}`);


        const output = `<a href="${hrf}">
                            <span class="sort-search"><i class="${ison}"></i></span>
                        </a>`;

        return new Handlebar.SafeString(output);
    }
};