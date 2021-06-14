// Copyright @ 2018-2021 xiejiahe. All rights reserved. MIT license.
// See https://github.com/xjh22222228/nav

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { verifyToken } from '../../services'
import { getToken, setToken } from '../../utils/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() visible: boolean
  @Output() onCancel = new EventEmitter()

  token = ''
  isLogin = !!getToken()
  submiting = false

  constructor(
    private message: NzMessageService,
    private notification: NzNotificationService,
  ) {}

  ngOnInit() {}

  hanldeCancel() {
    this.onCancel.emit()
  }

  login() {
    if (!this.token || this.token.length < 40) {
      return this.message.error('Please fill in correct Token');
    }

    this.submiting = true
    verifyToken(this.token)
      .then(() => {
        setToken(this.token);
        this.message.success('Token succesffully verified, refresh in 2 seconds!')
        setTimeout(() => window.location.reload(), 2000)
      })
      .catch(res => {
        this.notification.error('Token failed verification', res.message as string)
      })
      .finally(() => {
        this.submiting = false
      })
  }
}
