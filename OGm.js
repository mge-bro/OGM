
(() => {
  if (window.location.origin !== 'https://openguessr.com') return;

  const startOGm = () => {
  if (window.__ogmCleanup) window.__ogmCleanup();

  const L = window.L;
  const mapEl = document.getElementById('map');

  if (!L || !mapEl) return false;

  document.querySelectorAll('#__ogmOverlay,#__ogmStyle')
    .forEach(n => n.remove());

  const findCoords = () => {
    const frame =
      document.getElementById('panorama-iframe') ||
      [...document.querySelectorAll('iframe')].find(
        f => /streetview/i.test(f.src || '')
      );

    const match = (frame?.src || '').match(
      /location=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/
    );

    return match
      ? { lat: Number(match[1]), lng: Number(match[2]) }
      : null;
  };

  const discoverMap = () => {
    if (window.__ogmMap?._container === mapEl) {
      return window.__ogmMap;
    }

    for (const name of [
      'setView',
      'fire',
      'panTo',
      'invalidateSize',
      'latLngToContainerPoint'
    ]) {
      const original = L.Map.prototype[name];

      if (!original || original.__ogmPatched) continue;

      const wrapped = function (...args) {
        if (this?._container === mapEl) {
          window.__ogmMap = this;
        }

        return original.apply(this, args);
      };

      wrapped.__ogmPatched = true;
      L.Map.prototype[name] = wrapped;
    }

    window.dispatchEvent(new Event('resize'));

    return window.__ogmMap || null;
  };

  discoverMap();

  const style = document.createElement('style');
  style.id = '__ogmStyle';

  style.textContent = `
    #__ogmOverlay {
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 2147483647;
      width: 260px;
      box-sizing: border-box;
      padding: 0;
      color: #fff;
      background: #111;
      border: 1px solid #555;
      box-shadow: none;
      border-radius: 0;
      font: 12px/1.5 Arial, Helvetica, sans-serif;
      user-select: none;
      overflow: hidden;
    }

    #__ogmOverlay * {
      box-sizing: border-box;
      border-radius: 0 !important;
      box-shadow: none !important;
    }

    #__ogmOverlay .ogm-head {
      display: flex;
      align-items: center;
      gap: 9px;
      min-height: 38px;
      padding: 0 11px;
      background: #1b1b1b;
      border-bottom: 1px solid #555;
      cursor: grab;
      touch-action: none;
    }

    #__ogmOverlay .ogm-head:active {
      cursor: grabbing;
    }

    #__ogmOverlay .ogm-mark {
      width: 7px;
      height: 7px;
      background: #666;
      flex: 0 0 auto;
    }

    #__ogmOverlay .ogm-mark.on {
      background: #fff;
    }

    #__ogmOverlay .ogm-title {
      flex: 1;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: #fff;
    }

    #__ogmOverlay button {
      appearance: none;
      font: inherit;
      cursor: pointer;
    }

    #__ogmOverlay .ogm-body {
      padding: 11px;
    }

    #__ogmOverlay .ogm-label {
      display: block;
      margin: 0 0 5px;
      color: #999;
      font-size: 9px;
      font-weight: bold;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    #__ogmOverlay .ogm-coords {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
      margin-bottom: 12px;
    }

    #__ogmOverlay .ogm-coordinate {
      min-width: 0;
      padding: 8px;
      border: 1px solid #444;
      background: #181818;
    }

    #__ogmOverlay .ogm-value {
      display: block;
      overflow: hidden;
      color: #fff;
      font: 12px/1.4 Consolas, monospace;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-variant-numeric: tabular-nums;
    }

    #__ogmOverlay .ogm-scatter {
      margin-bottom: 12px;
      padding: 9px;
      border: 1px solid #444;
      background: #181818;
    }

    #__ogmOverlay .ogm-scatter-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 9px;
    }

    #__ogmOverlay .ogm-scatter-value {
      color: #fff;
      font: 12px Consolas, monospace;
    }

    #__ogmOverlay input[type="range"] {
      appearance: none;
      display: block;
      width: 100%;
      height: 3px;
      margin: 10px 0;
      background: #555;
      outline: none;
      cursor: pointer;
    }

    #__ogmOverlay input[type="range"]::-webkit-slider-thumb {
      appearance: none;
      width: 12px;
      height: 12px;
      background: #fff;
      border: 1px solid #111;
    }

    #__ogmOverlay input[type="range"]::-moz-range-thumb {
      width: 10px;
      height: 10px;
      background: #fff;
      border: 1px solid #111;
    }

    #__ogmOverlay .ogm-range-labels {
      display: flex;
      justify-content: space-between;
      color: #888;
      font-size: 9px;
    }

    #__ogmOverlay .ogm-action {
      width: 100%;
      min-height: 35px;
      padding: 8px 10px;
      border: 1px solid #fff;
      background: #eee;
      color: #111;
      font-size: 11px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: .5px;
    }

    #__ogmOverlay .ogm-action:hover:not(:disabled) {
      background: #fff;
    }

    #__ogmOverlay .ogm-action:disabled {
      border-color: #444;
      background: #292929;
      color: #777;
      cursor: not-allowed;
    }

    #__ogmOverlay .ogm-status {
      min-height: 16px;
      margin-top: 9px;
      color: #999;
      font-size: 10px;
      overflow-wrap: anywhere;
    }
  `;

  document.head.appendChild(style);

  const panel = document.createElement('section');
  panel.id = '__ogmOverlay';

  panel.innerHTML = `
    <header class="ogm-head" id="__ogmDragHandle">
      <span class="ogm-mark" id="__ogmLive"></span>
      <span class="ogm-title">OGm.js [beta]</span>
    </header>

    <div class="ogm-body">
      <div class="ogm-coords">
        <div class="ogm-coordinate">
          <span class="ogm-label">Latitude</span>
          <span class="ogm-value" id="__ogmLat">—</span>
        </div>

        <div class="ogm-coordinate">
          <span class="ogm-label">Longitude</span>
          <span class="ogm-value" id="__ogmLng">—</span>
        </div>
      </div>

      <div class="ogm-scatter">
        <div class="ogm-scatter-head">
          <span class="ogm-label" style="margin:0">Scatter distance</span>
          <span class="ogm-scatter-value" id="__ogmScatterValue">30 km</span>
        </div>

        <input
          type="range"
          id="__ogmScatter"
          min="0"
          max="300"
          step="1"
          value="30"
        >

        <div class="ogm-range-labels">
          <span>0 km</span>
          <span>150 km</span>
          <span>300 km</span>
        </div>
      </div>

      <button class="ogm-action" id="__ogmPin" type="button" disabled>
        Place marker
      </button>

      <div class="ogm-status" id="__ogmNote">
        Waiting for panorama...
      </div>
    </div>
  `;

  document.documentElement.appendChild(panel);

  const $ = selector => panel.querySelector(selector);

  const latEl = $('#__ogmLat');
  const lngEl = $('#__ogmLng');
  const button = $('#__ogmPin');
  const note = $('#__ogmNote');
  const live = $('#__ogmLive');
  const slider = $('#__ogmScatter');
  const scatterValue = $('#__ogmScatterValue');

  let scatterKm = 30;

  slider.addEventListener('input', () => {
    scatterKm = Number(slider.value);
    scatterValue.textContent = `${scatterKm} km`;
  });

  const togglePanel = event => {
    if (event.key !== 'Insert' || event.repeat) return;

    event.preventDefault();
    panel.hidden = !panel.hidden;
  };

  window.addEventListener('keydown', togglePanel);

  const handle = $('#__ogmDragHandle');
  let drag = null;

  handle.addEventListener('pointerdown', event => {
    if (event.target.closest('button')) return;

    const rect = panel.getBoundingClientRect();

    drag = {
      x: event.clientX,
      y: event.clientY,
      left: rect.left,
      top: rect.top
    };

    handle.setPointerCapture(event.pointerId);
  });

  handle.addEventListener('pointermove', event => {
    if (!drag) return;

    const left = Math.max(
      0,
      Math.min(
        window.innerWidth - panel.offsetWidth,
        drag.left + event.clientX - drag.x
      )
    );

    const top = Math.max(
      0,
      Math.min(
        window.innerHeight - panel.offsetHeight,
        drag.top + event.clientY - drag.y
      )
    );

    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
  });

  const stopDrag = () => {
    drag = null;
  };

  handle.addEventListener('pointerup', stopDrag);
  handle.addEventListener('pointercancel', stopDrag);

  let last = null;
  let lastKey = '';

  const update = () => {
    const coords = findCoords();
    if (!coords) return;

    last = coords;

    const key =
      `${coords.lat.toFixed(7)},${coords.lng.toFixed(7)}`;

    if (key === lastKey) return;

    lastKey = key;

    latEl.textContent = coords.lat.toFixed(5);
    lngEl.textContent = coords.lng.toFixed(5);

    button.disabled = false;
    live.classList.add('on');

    note.textContent = 'Panorama coordinates loaded.';
  };

  update();

  const timer = window.setInterval(update, 900);

  const scatterPoint = (coords, selectedKm) => {
    if (selectedKm === 0) {
      return {
        lat: coords.lat,
        lng: coords.lng,
        offset: 0,
        minKm: 0,
        maxKm: 0
      };
    }

    const earthRadius = 6371000;

    const minKm = selectedKm < 50
      ? selectedKm
      : Math.max(0, selectedKm - 10);

    const maxKm = Math.min(300, selectedKm + 10);

    const distanceKm =
      minKm + Math.random() * (maxKm - minKm);

    const distance = distanceKm * 1000;
    const bearing = Math.random() * Math.PI * 2;

    const lat1 = coords.lat * Math.PI / 180;
    const lon1 = coords.lng * Math.PI / 180;

    const angularDistance = distance / earthRadius;

    const lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(angularDistance) +
      Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(bearing)
    );

    const lon2 = lon1 + Math.atan2(
      Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(lat1),
      Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2)
    );

    return {
      lat: lat2 * 180 / Math.PI,
      lng: ((lon2 * 180 / Math.PI + 540) % 360) - 180,
      offset: distance,
      minKm,
      maxKm
    };
  };

  button.addEventListener('click', () => {
    const coords = findCoords() || last;
    const map = discoverMap();

    if (!coords || !map) {
      note.textContent = 'The map is not ready yet.';
      return;
    }

    const target = scatterPoint(coords, scatterKm);
    const latlng = L.latLng(target.lat, target.lng);

    map.setView(
      latlng,
      Math.max(map.getZoom(), 10),
      { animate: false }
    );

    try {
      const point = map.latLngToContainerPoint(latlng);
      const rect = mapEl.getBoundingClientRect();

      map.fire('click', {
        latlng,
        containerPoint: point,
        layerPoint: map.latLngToLayerPoint(latlng),
        originalEvent: new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
          button: 0,
          clientX: rect.left + point.x,
          clientY: rect.top + point.y
        })
      });

    } catch (error) {
      console.warn('Map event error:', error);
    }

    note.textContent = scatterKm === 0
      ? 'Offset: 0 m — original coordinates.'
      : `Offset: ${(target.offset / 1000).toFixed(1)} km ` +
        `(range ${target.minKm.toFixed(0)}–${target.maxKm.toFixed(0)} km)`;
  });

  window.__ogmCleanup = () => {
    clearInterval(timer);
    window.removeEventListener('keydown', togglePanel);
    panel.remove();
    style.remove();
  };

  return true;
  };

  let attempts = 0;
  const waitForGame = () => {
    if (startOGm()) return;
    attempts += 1;
    if (attempts < 240) window.setTimeout(waitForGame, 500);
    else console.warn('OGm: OpenGuessr map was not detected.');
  };

  waitForGame();
})();
