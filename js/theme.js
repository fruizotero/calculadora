
export class Theme {

    constructor() {
        this.colors = null;
        this.theme = [
            '--theme-main-background',
            '--theme-toggle-keypad-background',
            '--theme-screen-background',
            '--theme-key-second-background',
            '--theme-key-second-shadow',
            '--theme-key-third-background-toggle',
            '--theme-key-third-shadow',
            '--theme-key-background-button',
            '--theme-key-background-shadow-button',
            '--theme-text-color-first',
            '--theme-text-color-second',
            '--theme-color-text-top',
            '--theme-single-color-character'
        ];
    }

    initializeColors(option = 1) {

        const theme_1 = [
            'hsl(222, 26%, 31%)',
            'hsl(223, 31%, 20%)',
            'hsl(224, 36%, 15%)',
            'hsl(225, 21%, 49%)',
            'hsl(224, 28%, 35%)',
            'hsl(6, 63%, 50%)',
            'hsl(6, 70%, 34%)',
            'hsl(30, 25%, 89%)',
            'hsl(28, 16%, 65%)',
            'hsl(221, 14%, 31%)',
            'hsl(0, 0%, 100%)',
            'hsl(0, 0%, 100%)',
            'hsl(0, 0%, 100%)'
        ];

        const theme_2 = [
            'hsl(0, 0%, 90%)',
            'hsl(0, 5%, 81%)',
            'hsl(0, 0%, 93%)',
            'hsl(185, 42%, 37%)',
            'hsl(185, 58%, 25%)',
            'hsl(25, 98%, 40%)',
            'hsl(25, 99%, 27%)',
            'hsl(45, 7%, 89%)',
            'hsl(35, 11%, 61%)',
            'hsl(60, 10%, 19%)',
            'hsl(0, 0%, 100%)',
            'hsl(60, 10%, 19%)',
            'hsl(0, 0%, 100%)'
        ];

        const theme_3 = [
            'hsl(268, 75%, 9%)',
            'hsl(268, 71%, 12%)',
            'hsl(268, 71%, 12%)',
            'hsl(281, 89%, 26%)',
            'hsl(285, 91%, 52%)',
            'hsl(176, 100%, 44%)',
            'hsl(177, 92%, 70%)',
            'hsl(268, 47%, 21%)',
            'hsl(290, 70%, 36%)',
            'hsl(52, 100%, 62%)',
            'hsl(0, 0%, 100%)',
            'hsl(52, 100%, 62%)',
            'hsl(198, 20%, 13%)'
        ]

        switch (option) {
            case 1:
                this.colors = theme_1;
                break;
            case 2:
                this.colors = theme_2;
                break;
            case 3:
                this.colors = theme_3;
                break;
        }

        this.theme.forEach((value, index) => {
            document.documentElement.style
                .setProperty(value, this.colors[index]);
        });

    }
}

