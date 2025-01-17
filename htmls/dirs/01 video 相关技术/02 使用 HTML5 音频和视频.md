## 使用 HTML5 音频和视频

## Audio

```html
<audio src="" controls="controls"></audio>
```

**audio 支持的属性值：**

| 属性     | 值       | 说明                                                                                      |
| -------- | -------- | ----------------------------------------------------------------------------------------- |
| autoplay | autoplay | 如果出现该属性，则音频在就绪后马上播放                                                    |
| controls | controls | 如果出现该属性，则向用户显示控件，比如播放按钮                                            |
| loop     | loop     | 如果出现该属性，则每当音频结束时重新开始播放                                              |
| preload  | preload  | 如果出现该属性，则音频在页面加载时进行加载，并预备播放。如果使用 autoplay，则忽略该属性。 |

audio 标签可以包含多个 source 标签，用来导入不同的音频文件，浏览器会自动选择第一个可识别的格式进行播放。

```html
<audio controls="controls">
  <source src="medias/test.ogg" type="audio/ogg" />
  <source src="medias/test.mp3" type="audio/mpeg" />
  你的浏览器不支持 audio 标签
</audio>
```

```html
<audio autoplay loop>
  <source src="medias/test.ogg" type="audio/ogg" />
  <source src="medias/test.mp3" type="audio/mpeg" />
  你的浏览器不支持 audio 标签
</audio>
```

## Video

```html
<video src="" controls="controls"></video>
```

**video 支持的属性值：**

| 属性     | 值       | 说明                                                                                      |
| -------- | -------- | ----------------------------------------------------------------------------------------- |
| autoplay | autoplay | 如果出现该属性，则视频在就绪后马上播放                                                    |
| controls | controls | 如果出现该属性，则向用户显示控件，比如播放按钮                                            |
| loop     | loop     | 如果出现该属性，则当媒介文件完成播放后再次开始播放                                        |
| muted    | muted    | 设置视频的音频输出应该被静音                                                              |
| poster   | URL      | 设置视频下载时显示的图像，或者在用户单击 “播放” 按钮前显示的图像                          |
| preload  | preload  | 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 “autoplay”，则忽略该属性 |

```html
<video controls autoplay>
  <source src="medias/trailer.ogg" type="video/ogg" />
  <source src="medias/trailer.mp4" type="video/mp4" />
  您的浏览器不支持 video 标签
</video>
```

也可以使用 Js 脚本控制媒体播放，简单说明如下：

- load(): 可以加载音频或视频文件
- play()
- pause()
- canPlayType(type): 检测 video 元素是否支持给定 MIME 类型的文件

### 设置属性

audio 和 video 元素拥有相同的脚本属性。

1. autobuffer 属性

可读写属性，使用该属性可以使得 audio 和 video 元素实现自动缓冲，默认为 false。

如果值为 true，则自动缓冲，但并不播放。

如果使用了 autoplay 属性，则 autobuffer 属性会被忽略。

```html
<audio controls="controls" autobuffer="true">
  <source src="medias/test.ogg" type="audio/ogg" />
  <source src="medias/test.mp3" type="audio/mpeg" />
  你的浏览器不支持 audio 标签
</audio>
```

2. buffered 属性

只读属性，用于返回一个 TimeRanges 对象，确认浏览器已经缓存媒体文件。

3. currentSrc 属性

只读属性，无默认值。用于返回媒体数据的 URL 地址，如果不存在，则返回空。

4. currentTime 属性

可读写属性，用于获取或设置当前播放位置，返回值为时间，单位为秒。

5. defaultPlaybackRate

可读写属性，用于获取或设置当前播放速率，前提是用户没有使用快进或快退控件。

6. duration 属性

只读属性，用于获取当前媒体的持续时间，返回值为时间，单位为秒。

7. ended 属性

只读属性，用于返回一个布尔值，以获悉媒体是否播放结束。

8. error 属性

只读属性，用于返回一个 `MediaError` 对象以表明当前的错误状态。如果没有出现错误，则返回 null。

错误状态共有 4 个可能值：

- MEDIA_ERR_ABORTED (数字值为 1): 媒体资源获取异常，媒体数据的下载过程因用户操作而终止。
- MEDIA_ERR_NETWORK (数字值为 2): 网路错误，在媒体数据已经就绪时用户停止了媒体下载资源的过程。
- MEDIA_ERR_DECODE (数字值为 3): 媒体解码错误，在媒体数据已经就绪时解码过程中出现了错误。
- MEDIA_ERR_SRC_NOT_SUPPORTED (数字值为 4): 媒体格式不被支持。

9. initialTime 属性

只读属性，用于获取最早的可用于回放的位置，返回值为时间，单位为秒。

10. networkState 属性

只读属性，用于返回媒体的网络状态，共有 4 个可能值：

- NETWORK_EMPTY (数字值为 0): 元素尚未初始化
- NETWORK_IDLE (数字值为 1): 加载完成，网络空闲
- NETWORK_LOADING (数字值为 2): 媒体数据加载中
- NETWORK_NO_SOURCE (数字值为 3): 因为不存在支持的编码格式，加载失败

11. playbackRate 属性

可读写属性，用于读取或设置媒体资源播放的当前速率。

12. played 属性

只读属性，用于返回一个 TimeRanges 对象，标明媒体资源在浏览器中已播放的时间范围。

TimeRanges 对象的 length 属性为已播放部分的时间段，该对象有两个方法，end 方法用于返回已播放时间段的结束时间，start 方法用于返回已播放时间段的开始时间，

```js
var ranges = document.getElementById("myVideo").played;
for (var i = 0; i < ranges.length; i++) {
  var start = ranges.start(i);
  var end = ranges.end(i);
  console.log("从" + start + "开始播放到" + end + "结束。");
}
```

13. preload 属性

可读写属性，用于定义视频是否预加载，

- none: 不进行预加载
- metadata: 部分预加载
- auto: 全部预加载

14. readyState 属性

只读属性，用于返回媒体当前播放位置的就绪状态，共有 5 个可能值：

- HAVE_NOTHING (数字值为 0)：当前播放位置没有有效的媒体资源。
- HAVE_METADATA (数字值为 1)：媒体资源确认存在且加载中，但当前位置没有能够加载到有效的媒体数据以进行播放。
- HAVE_CURRENT_DATA (数字值为 2)：已获取当前播放数据，但没有足够的数据进行播放。
- HAVE_FUTURE_DATA (数字值为 3)：在当前位置已获取到后续播放媒体数据，可以进行播放。
- HAVE_ENOUGH_DATA (数字值为 4)：媒体数据可以进行播放，且浏览器确认媒体数据正以某一种速率进行加载并有足够的后续数据以继续进行播放，而不会使浏览器的播放进度赶上加载数据的末端。

15. seekable 属性

只读属性，用于返回一个 TimeRanges 对象，表明可以对当前媒体资源进行请求。

16. seeking 属性

只读属性，用于返回一个默认值，表示浏览器是否正在请求某一播放位置的媒体数据，true 表示浏览器正在请求数据，而 false 表示浏览器已经停止请求数据。

17. volume 属性

可读写属性，用于获取或设置媒体资源的播放音量。范围为 `0.0 ~ 1.0`。

## 设置方法

audio 和 video 元素拥有相同的脚本方法：

1. canPlayType()

用户返回一个字符串以表明客户端是否能够播放指定的媒体类型

```js
var canPlay = media.canPlayType(type);
```

type 为客户端浏览器能够播放的媒体类型。

可能得返回值有：

- probably: 表示浏览器确定支持此媒体类型
- maybe: 表示浏览器可能支持此媒体类型
- 空字符串: 表示浏览器不支持此媒体类型

2. load()

用于重置媒体元素并重新载入媒体，不返回任何值。

该方法可中止任何正在进行的任务或事件。

元素的 playbackRate 属性值会被强行设置为 defaultPlaybackRate 属性的值，而且元素的 error 值会被强行设置为 null。

**示例**

```html
<input type="button" value="载入新的视频" onclick="loadNewVideo()" />

<script>
  function loadNewVideo() {
    var video = document.getElementsByTagName("video")[0];
    var sources = video.getElementsByTagName("source");
    sources[0].src = "medias/video2.ogv";
    sources[1].src = "medias/video2.mp4";
    video.load(); // 用 load 方法载入新的视频
  }
</script>
```

### 设置事件

一种是使用 `addEventListener()` 监听

另一种是使用 `video.onplay = function() {}`

**音频和视频相关事件**

| 事件             | 描述                                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| abort            | 浏览器在完全加载媒体数据之前中止获取媒体数据                                                         |
| canplay          | 浏览器能够开始播放媒体数据，但估计以当前速率播放不能直接将媒体播放完，即可能因播放期间需要缓冲而停止 |
| canplaythrough   | 浏览器以当前速率可以直接播放完整个媒体资源，在此期间不需要缓冲                                       |
| durationchange   | 媒体长度（duration 属性）改变                                                                        |
| emptied          | 媒体资源元素突然为空时，可能是网络错误或加载错误等                                                   |
| ended            | 媒体播放已抵达结尾                                                                                   |
| error            | 在元素加载期间出现错误                                                                               |
| loadeddata       | 已经加载当前播放位置的媒体数据                                                                       |
| loadedmetadata   | 浏览器已经获取媒体元素的持续时间和尺寸                                                               |
| loadstart        | 浏览器开始加载媒体数据                                                                               |
| pause            | 媒体数据暂停播放                                                                                     |
| play             | 媒体数据将要开始播放                                                                                 |
| playing          | 媒体数据已经开始播放                                                                                 |
| progress         | 浏览器正在获取媒体数据                                                                               |
| ratechange       | 媒体数据的默认播放速率（defaultPlaybackRate 属性）改变或播放速率（playbackRate 属性）改变            |
| readystatechange | 就绪状态（ready-state）改变                                                                          |
| seeked           | 浏览器停止请求数据，媒体元素的定位属性不再为真（seeking 属性值为 false）且定位已结束                 |
| seeking          | 浏览器正在请求数据，媒体元素的定位属性为真（seeking 属性值为 true）且定位已开始                      |
| stalled          | 浏览器获取媒体数据过程中出现异常                                                                     |
| suspend          | 浏览器非主动获取媒体数据，但在取回整个媒体文件之前中止                                               |
| timeupdate       | 媒体当前播放位置（currentTime 属性）发生改变                                                         |
| volumechange     | 媒体音量（volume 属性）改变或静音（muted 属性）                                                      |
| waiting          | 媒体已停止播放但打算继续播放                                                                         |

**示例**

```html
<body onload="init()">
  <video
    id="video1"
    autoplay
    oncanplay="startVideo()"
    onended="stopTimeline()"
    autobuffer="true"
    width="400"
    height="300"
  >
    <source src="medias/volcano.ogv" type="video/ogg" />
    <source src="medias/volcano.mp4" type="video/mp4" />
  </video>
  <button onclick="play()">播放</button>
  <button onclick="pause()">暂停</button>
</body>
```

```js
var video;
function init() {
  video = document.getElementById("video1");
  video.addEventListener(
    "ended",
    function () {
      alert("播放结束");
    },
    true
  );
  video.addEventListener(
    "error",
    function () {
      switch (video.error.code) {
        case MediaError.MEDIA_ERROR_ABORTED:
          alert("视频的下载过程被中止");
          break;
        case MediaError.MEDIA_ERROR_NETWORK:
          alert("网络发生故障，视频的下载过程被中止");
          break;
        case MediaError.MEDIA_ERROR_DECODE:
          alert("解码失败");
          break;
        case MediaError.MEDIA_ERROR_SRC_NOT_SUPPORTED:
          alert("媒体资源不可用或媒体格式不被支持");
          break;
        default:
          alert("发生未知错误");
      }
    },
    false
  );
}

function play() {
  video.play();
}

function pause() {
  video.pause();
}
```
