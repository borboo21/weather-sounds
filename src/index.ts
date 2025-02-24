import './index.css'

class AudioPlayer {
	private audioElement: HTMLAudioElement;
	private buttons: NodeListOf<HTMLButtonElement>;
	private volumeControl: HTMLInputElement;
	private currentButton: HTMLButtonElement | null = null;

	constructor() {
		this.audioElement = document.getElementById('audio-player') as HTMLAudioElement;
		this.buttons = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
		this.volumeControl = document.getElementById('volume-control') as HTMLInputElement;
		this.init();
	}
	private init(): void {
		this.buttons.forEach(button => {
			button.addEventListener('click', () => this.changeAudio(button))});
		this.volumeControl.addEventListener('input', () => this.changeVolume())
	}
	private changeAudio(button:HTMLButtonElement): void {
		const newAudioSrc = button.getAttribute('data-audio');
		const newBackSrc = button.getAttribute('data-img');

		function changeIcon(parentNode: Node, icon: boolean, ) {
			const buttonIcon = document.createElement('img');
			const buttonIconSrc = button.getAttribute('data-icon');
			buttonIcon.setAttribute('src', buttonIconSrc || '');
			const pauseIcon = document.createElement('img');
			const pauseIconSrc = '/files/assets/icons/pause.svg';
			pauseIcon.setAttribute('src', pauseIconSrc);
			parentNode.removeChild(parentNode.childNodes[0]);
			icon? parentNode.appendChild(buttonIcon) : parentNode.appendChild(pauseIcon);
		}

		if (this.currentButton === button) {
			if(this.audioElement.paused){
				this.audioElement.play();
				changeIcon(button, false);
			} else {
				this.audioElement.pause();
				changeIcon(button, true);
			}
			return
		}

		if (newAudioSrc) {
			this.audioElement.src = newAudioSrc;
			this.buttons.forEach(btn => {
				const btnIconSrc = btn.getAttribute('data-icon');
				const btnIcon = document.createElement('img');
				btnIcon.setAttribute('src', btnIconSrc || '');
				btn.removeChild(btn.childNodes[0]);
				btn.appendChild(btnIcon)
			})
			document.body.style.backgroundImage = `url('${newBackSrc}')`;
			changeIcon(button, false);
			this.audioElement.play();
		}
		this.currentButton = button;
	}

	private changeVolume(): void {
		this.audioElement.volume = parseFloat(this.volumeControl.value);
	}

}

const audioPlayer = new AudioPlayer();
