export class Text{
    constructor(){
        this.canvas = document.createElement('canvas');
        // this.canvas.style.position = 'absolute';
        // this.canvas.style.left = '0';
        // this.canvas.style.top = '0';
        // document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
    }

    setText(str, density, stageWidth, stageHeight){
        this.canvas.width = stageWidth;
        this.canvas.height = stageHeight;

        //const myText = str;
        const lines = str.split('\n'); // 줄바꿈 기준으로 텍스트 나누기
        const fontWidth = 700;
        const fontSize = 161;
        const fontName = 'Hahmlet';
        const lineHeight = fontSize + 30; // 줄 간격 추가

        this.ctx.clearRect(0,0,stageWidth, stageHeight);
        this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
        this.ctx.fillStyle = `rgba(0,0,0,0.3)`;
        this.ctx.textBaseline = `middle`;

        const particles = [];
        lines.forEach((line, index) => {
            const fontPos = this.ctx.measureText(line);
            const x = (stageWidth - fontPos.width) / 2; // 중앙 정렬
            const y =
                ((stageHeight - lines.length * lineHeight) / 1.5) +
                index * lineHeight;
    
            // 텍스트 출력
            this.ctx.fillText(line, x, y);
    
            // 각 줄에 대한 입자 생성
            particles.push(...this.dotPos(density, stageWidth, stageHeight));
        });
    
        return particles;
    }

    dotPos(density, stageWidth, stageHeight){
        // 좌표, 너비, 높이를 주면 해당 영역의 이미지 정보를 가지는 ImageData 객체 리턴
        const imageData = this.ctx.getImageData(
            0,0,
            stageWidth, stageHeight
        ).data;

        const particles = [];
        let i = 0;
        let width = 0;
        let pixel;

        for(let height = 0; height < stageHeight; height += density){
            ++i;
            const slide = (i%2)==0;
            width = 0;
            if(slide==1){
                width += 6;
            }

            for (width; width < stageWidth; width += density){
                pixel = imageData[((width+(height * stageWidth)) * 4) - 1];
                if(pixel != 0 &&
                    width > 0 &&
                    width < stageWidth &&
                    height > 0 &&
                    height < stageHeight) {
                        particles.push({
                            x: width, 
                            y: height
                        });
                    }
            }
        }
        
        return particles;
    }
}