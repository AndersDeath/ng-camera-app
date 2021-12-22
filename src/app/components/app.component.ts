import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

const getCameraSelection = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(device => device.kind === 'videoinput');
  return videoDevices;

};

const constraints = {
  video: {
    width: {
      min: 1280,
      ideal: 1920,
      max: 2560,
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440
    },
  }
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild("video")
  public video!: ElementRef;

  @ViewChild("canvas")
  public canvas!: ElementRef;

  public captures: Array<any> = [];

  public videoDevices = [];

  isActive = false;
  isDesktop = false;

  constructor( private deviceService: DeviceDetectorService) {
  }
  public ngOnInit() {

    this.isDesktop = this.deviceService.isDesktop();
    console.log(this.isDesktop)
    getCameraSelection().then((e: any) => {
      console.log(e);
      const updatedConstraints = {
        ...constraints,
        deviceId: {exact: e[1].deviceId}
      };
      console.log(updatedConstraints)
    });


   }


public startHandler() {
  this.startStream(constraints);
}

  public startStream(constraints: any) {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constraints).then((stream: any) => {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.isActive = true;
      });
    }
  }

  public stopHandler() {
    this.stopStream();
  }
  public stopStream() {
    const stream = this.video.nativeElement.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function(track:any) {
      track.stop();
    });

    this.video.nativeElement.srcObject = null;
    this.isActive = false;

  }


  public capture() {
    let context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 1280, 720);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
}

}
