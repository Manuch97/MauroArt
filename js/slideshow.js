class Slideshow {
    constructor(photoUrls) {
        this.photoUrls = photoUrls ? photoUrls : [];
        this.selectedDivIndex = 0;
        this.selectedPhotoIndex = 0;
        this.slideElement = document.getElementById("slide-show");
        this.slideElementImg = this.slideElement.getElementsByClassName("slide-img");
        this.slideDisplay = document.getElementById("slide-display");
        this.slideDisplayContent = this.slideDisplay.getElementsByClassName("slide-display-content")[0];


        let cards = document.getElementsByClassName("card-container");
        cards[0].addEventListener('wheel', this.handleWheel.bind(this));
        cards[1].addEventListener('wheel', this.handleWheel.bind(this));

        Array.from(this.slideElementImg).forEach((slideImg, index) => {
            slideImg.addEventListener('click', (ev) => {
                this.selectedPhotoIndex += index - this.selectedDivIndex;
                this.selectedDivIndex = index;
                this.showPhoto(ev.target);
            });
        });
    }

    setPhotos(photos) {
        this.removeAllSelected();
        this.selectedDivIndex = 0;
        this.selectedPhotoIndex = 0;
        this.photoUrls = photos;
        for (let i=0; i < photos.length; i++) {
            if (i >= this.slideElementImg.length) break;
            
            if (i==0) {
                this.slideElementImg[i].style.border = "3px solid yellow";
                this.slideDisplayContent.style.backgroundImage = `url(${photos[i]})`;
            }
            this.slideElementImg[i].style.backgroundImage = `url(${photos[i]})`;
        }
    }

    nextPhoto() {
        if (!this.photoUrls) return;
        
        if (this.selectedDivIndex + 1 < this.slideElementImg.length) {
            this.selectedDivIndex ++;
            this.selectedPhotoIndex ++;
        }
        else {
            if ( this.photoUrls.length > this.selectedPhotoIndex + 1 ) {
                this.selectedPhotoIndex ++;
                for (let i=0; i < this.slideElementImg.length; i++) {
                    if (i+1 < this.slideElementImg.length) { //All elements
                        this.slideElementImg[i].style.backgroundImage = this.slideElementImg[i+1].style.backgroundImage;
                    } else { // Last one (bottom)
                        this.slideElementImg[i].style.backgroundImage = `url(${this.photoUrls[this.selectedPhotoIndex]})`;
                    }
               }
            }
        }
        this.showPhoto(this.selectedDivIndex);
    }

    previousPhoto() {
        if (!this.photoUrls) return;
        
        if (this.selectedDivIndex > 0) {
            this.selectedDivIndex --;
            this.selectedPhotoIndex --;
        }
        else {
            if ( this.selectedPhotoIndex > 0 ) {
                this.selectedPhotoIndex --;

                for (let i = this.slideElementImg.length - 1; i >= 0; i--) {
                    if (i < 1) { // Last element
                        this.slideElementImg[i].style.backgroundImage = `url(${this.photoUrls[this.selectedPhotoIndex]})`;
                    } else { // All other elements
                        this.slideElementImg[i].style.backgroundImage = this.slideElementImg[i - 1].style.backgroundImage;
                    }
                }
            }
        }
        this.showPhoto(this.selectedDivIndex);
    }

    showPhoto(selectedDiv) {
        if (typeof selectedDiv == 'number') selectedDiv = this.slideElementImg[selectedDiv];

        this.slideDisplayContent.style.backgroundImage = selectedDiv.style.backgroundImage;
        this.removeAllSelected();
        selectedDiv.style.border = "3px solid yellow";
    }

    handleWheel(event) {
        //event.preventDefault();

        if (event.deltaY < 0) {
            this.previousPhoto();
        } else {
            this.nextPhoto();
        }
    }

    removeAllSelected() {
        let photosEl = this.slideElement.getElementsByClassName("slide-img");
        for (let i=0; i < photosEl.length; i++)
            photosEl[i].style.border = "2px solid white";
    }
}