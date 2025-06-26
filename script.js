function generateRouterTabs() {
  const count = document.getElementById('routerCount').value;
  const tabButtons = document.getElementById('tab-buttons');
  const tabContent = document.getElementById('tab-content');

  tabButtons.innerHTML = "";
  tabContent.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    const btn = document.createElement('button');
    btn.innerText = `Router ${i}`;
    btn.className = 'tab-btn';
    btn.onclick = () => showTab(i);
    tabButtons.appendChild(btn);

    const div = document.createElement('div');
    div.className = 'router-tab';
    div.id = `router-tab-${i}`;
    div.style.display = i === 1 ? 'block' : 'none';
    div.innerHTML = `
      <h2>Router ${i}</h2>
      <div class="config">
        <label>Enter Privilege Exec Mode?
          <span class="tooltip">?
            <span class="tooltip-text">Access full router commands (Command: <code>enable</code>)</span>
          </span>
          <input type="checkbox">
        </label><br>
        <label>Enter Global Config Mode?
          <span class="tooltip">?
            <span class="tooltip-text">Enter configuration mode (Command: <code>conf t</code>)</span>
          </span>
          <input type="checkbox">
        </label><br>
        <label>Setup Host-Name?
          <span class="tooltip">?
            <span class="tooltip-text">Set router hostname (Command: <code>hostname [name]</code>)</span>
          </span>
          <input type="checkbox" onchange="toggleInput(this, 'hostname${i}')">
          <input type="text" id="hostname${i}" placeholder="Enter hostname" style="display:none">
        </label><br>
        <label>Setup Domain-Name?
          <span class="tooltip">?
            <span class="tooltip-text">Set domain name (Command: <code>ip domain-name [name]</code>)</span>
          </span>
          <input type="checkbox" onchange="toggleInput(this, 'domain${i}')">
          <input type="text" id="domain${i}" placeholder="Enter domain name" style="display:none">
        </label><br><br>
        <label>User Authentication?
          <span class="tooltip">?
            <span class="tooltip-text">Configure local user accounts and enable secret for router access (Commands: <code>username [name] password [pass]</code>, <code>enable secret [password]</code>)</span>
          </span>
          <input type="checkbox" id="auth${i}" onchange="toggleAuthFields(${i})">
        </label>
        <div id="authFields${i}" style="display:none; padding-left: 20px;">
          <label>Number of Users:
            <input type="number" min="1" max="10" id="authCount${i}" onchange="generateUserFields(${i})">
          </label>
          <div id="users${i}"></div>
          <label>Enable Secret:
            <input type="text" id="enableSecret${i}">
          </label>
        </div><br>
        <label>Banner MOTD?
          <span class="tooltip">?
            <span class="tooltip-text">Message of the Day banner displayed to all users (Command: <code>banner motd # [message] #</code>)</span>
          </span>
          <input type="checkbox" onchange="toggleInput(this, 'motd${i}')">
          <input type="text" id="motd${i}" placeholder="Banner MOTD" style="display:none">
        </label><br>
        <label>Banner Login?
          <span class="tooltip">?
            <span class="tooltip-text">Login banner displayed before authentication (Command: <code>banner login # [message] #</code>)</span>
          </span>
          <input type="checkbox" onchange="toggleInput(this, 'loginBanner${i}')">
          <input type="text" id="loginBanner${i}" placeholder="Banner Login" style="display:none">
        </label><br>
        <label>Banner Exec?
          <span class="tooltip">?
            <span class="tooltip-text">Exec banner displayed after successful login (Command: <code>banner exec # [message] #</code>)</span>
          </span>
          <input type="checkbox" onchange="toggleInput(this, 'execBanner${i}')">
          <input type="text" id="execBanner${i}" placeholder="Banner Exec" style="display:none">
        </label><br><br>
        <label>Logging Synchronous?
          <span class="tooltip">?
            <span class="tooltip-text">Prevents console messages from interrupting command input (Command: <code>logging synchronous</code> under line con 0)</span>
          </span>
          <input type="checkbox" id="logSync${i}">
        </label><br>
        <label>No Exec Timeout?
          <span class="tooltip">?
            <span class="tooltip-text">Disables automatic logout timeout for console sessions (Command: <code>no exec-timeout</code> under line con 0)</span>
          </span>
          <input type="checkbox" id="noTimeout${i}">
        </label><br><br>
        <label>VTY Access (SSH & Telnet)?
          <span class="tooltip">?
            <span class="tooltip-text">Enable remote access via SSH and Telnet (Commands: <code>crypto key generate rsa</code>, <code>line vty 0 4</code>, <code>transport input telnet ssh</code>)</span>
          </span>
          <input type="checkbox" id="vty${i}">
        </label><br><br>
        
        <h3>Interfaces</h3>
        <div>
          <label>Ethernet Interfaces:
            <span class="tooltip">?
              <span class="tooltip-text">10 Mbps Ethernet interfaces (Command: <code>interface ethernet[slot]/[port]</code> or <code>interface e[slot]/[port]</code>)</span>
            </span>
            <input type="number" id="eth${i}" value="0" min="0" onchange="generateInterfaceFields('eth', ${i})">
          </label>
          <div id="ethContainer${i}"></div>
        </div>
        <div>
          <label>Fast Ethernet Interfaces:
            <span class="tooltip">?
              <span class="tooltip-text">100 Mbps Fast Ethernet interfaces (Command: <code>interface fastethernet[slot]/[port]</code> or <code>interface f[slot]/[port]</code>)</span>
            </span>
            <input type="number" id="feth${i}" value="0" min="0" onchange="generateInterfaceFields('feth', ${i})">
          </label>
          <div id="fethContainer${i}"></div>
        </div>
        <div>
          <label>Gigabit Ethernet Interfaces:
            <span class="tooltip">?
              <span class="tooltip-text">1000 Mbps (1 Gbps) Gigabit Ethernet interfaces (Command: <code>interface gigabitethernet[slot]/[port]</code> or <code>interface g[slot]/[port]</code>)</span>
            </span>
            <input type="number" id="geth${i}" value="0" min="0" onchange="generateInterfaceFields('geth', ${i})">
          </label>
          <div id="gethContainer${i}"></div>
        </div>
        <div>
          <label>Serial Interfaces:
            <span class="tooltip">?
              <span class="tooltip-text">Variable speed WAN serial interfaces (Command: <code>interface serial[slot]/[port]</code> or <code>interface s[slot]/[port]</code>)</span>
            </span>
            <input type="number" id="ser${i}" value="0" min="0" onchange="generateInterfaceFields('ser', ${i})">
          </label>
          <div id="serContainer${i}"></div>
        </div>
        <div>
          <label>Loopback Interfaces:
            <span class="tooltip">?
              <span class="tooltip-text">Virtual logical interfaces for testing and management (Command: <code>interface loopback[number]</code>)</span>
            </span>
            <input type="number" id="loop${i}" value="0" min="0" onchange="generateLoopbackFields(${i})">
          </label>
          <div id="loopContainer${i}"></div>
        </div><br><br>
        
        <h3>Routing Configuration</h3>
        <div>
          <label>Static Routing?
            <span class="tooltip">?
              <span class="tooltip-text">Configure static routes manually (Command: <code>ip route [network] [mask] [next-hop]</code>)</span>
            </span>
            <input type="checkbox" id="staticRouting${i}" onchange="toggleRoutingFields('static', ${i})">
          </label>
          <div id="staticFields${i}" style="display:none; padding-left: 20px; margin-top: 10px;">
            <label>Number of Networks:
              <input type="number" min="1" max="10" id="staticCount${i}" onchange="generateStaticFields(${i})">
            </label>
            <div id="staticRoutes${i}"></div>
          </div>
        </div><br>
        <div>
          <label>EIGRP?
            <span class="tooltip">?
              <span class="tooltip-text">Enhanced Interior Gateway Routing Protocol - Cisco proprietary distance vector protocol (Command: <code>router eigrp [AS-number]</code>)</span>
            </span>
            <input type="checkbox" id="eigrp${i}" onchange="toggleRoutingFields('eigrp', ${i})">
          </label>
          <div id="eigrpFields${i}" style="display:none; padding-left: 20px; margin-top: 10px;">
            <label>EIGRP AS Number:
              <span class="tooltip">?
                <span class="tooltip-text">Autonomous System number for EIGRP (1-65535)</span>
              </span>
              <input type="number" id="eigrpAS${i}" placeholder="1" min="1" max="65535">
            </label><br>
            <label>Number of Networks:
              <input type="number" min="1" max="10" id="eigrpNetCount${i}" onchange="generateEigrpNetFields(${i})">
            </label>
            <div id="eigrpNetworks${i}"></div>
          </div>
        </div><br>
        <div>
          <label>OSPF?
            <span class="tooltip">?
              <span class="tooltip-text">Open Shortest Path First - Link state routing protocol (Command: <code>router ospf [process-id]</code>)</span>
            </span>
            <input type="checkbox" id="ospf${i}" onchange="toggleRoutingFields('ospf', ${i})">
          </label>
          <div id="ospfFields${i}" style="display:none; padding-left: 20px; margin-top: 10px;">
            <label>OSPF Process ID:
              <span class="tooltip">?
                <span class="tooltip-text">Local process identifier for OSPF (1-65535)</span>
              </span>
              <input type="number" id="ospfProcess${i}" placeholder="1" min="1" max="65535">
            </label><br>
            <label>Router-ID:
              <span class="tooltip">?
                <span class="tooltip-text">Unique identifier for OSPF router in dotted decimal format (Command: <code>router-id [IP address]</code>)</span>
              </span>
              <input type="text" id="ospfRouterID${i}" placeholder="1.1.1.1">
            </label><br>
            <label>Number of Networks:
              <input type="number" min="1" max="10" id="ospfNetCount${i}" onchange="generateOspfNetFields(${i})">
            </label>
            <div id="ospfNetworks${i}"></div>
          </div>
        </div><br>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background: var(--bg-secondary); border-radius: 8px; border-left: 4px solid var(--success-color);">
        <label>Save Configuration?
          <span class="tooltip">?
            <span class="tooltip-text">Save running configuration to startup configuration (Command: <code>do wr</code> or <code>copy running-config startup-config</code>)</span>
          </span>
          <input type="checkbox" id="doWr${i}">
        </label>
      </div>
    `;
    tabContent.appendChild(div);
  }

  showTab(1);
}

function showTab(i) {
  const tabs = document.querySelectorAll('.router-tab');
  tabs.forEach(tab => tab.style.display = 'none');
  document.getElementById(`router-tab-${i}`).style.display = 'block';
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active-tab'));
  buttons[i - 1].classList.add('active-tab');
}

function toggleInput(checkbox, inputId) {
  const input = document.getElementById(inputId);
  input.style.display = checkbox.checked ? 'inline-block' : 'none';
}

function toggleAuthFields(index) {
  const authDiv = document.getElementById(`authFields${index}`);
  authDiv.style.display = document.getElementById(`auth${index}`).checked ? "block" : "none";
}

function generateUserFields(index) {
  const container = document.getElementById(`users${index}`);
  const count = document.getElementById(`authCount${index}`).value;
  container.innerHTML = "";
  for (let j = 1; j <= count; j++) {
    container.innerHTML += `
      <label>User ${j}:
        Username <input type="text" id="user${index}_${j}_name" placeholder="username">
        Password <input type="text" id="user${index}_${j}_pass" placeholder="password">
      </label><br>`;
  }
}

function generateInterfaceFields(type, routerId) {
  const count = parseInt(document.getElementById(`${type}${routerId}`).value || 0);
  const container = document.getElementById(`${type}Container${routerId}`);
  const totalInterfaces = count * 4; // Multiply by 4
  
  container.innerHTML = "";
  
  if (totalInterfaces > 0) {
    container.innerHTML = `<div style="margin: 10px 0; padding: 10px; border: 2px solid var(--border-color); border-radius: 8px; background: var(--bg-secondary);">
      <strong>Slot Number: <input type="number" id="${type}Slot${routerId}" min="0" value="${getDefaultSlot(type)}"></strong><br><br>`;
    
    for (let i = 0; i < totalInterfaces; i++) {
      const interfaceName = getInterfaceName(type);
      const showDuplex = type !== 'ser';
      const showOspfPriority = type !== 'ser'; // Show OSPF Priority for all ethernet interfaces
      
      container.innerHTML += `
        <div style="margin: 10px 0; padding: 10px; background: var(--bg-tertiary); border-radius: 6px; border: 1px solid var(--border-color);">
          <strong style="color: var(--accent-primary);">${interfaceName} Interface ${i}</strong><br>
          IP Address: <input type="text" id="${type}IP${routerId}_${i}" placeholder="192.168.1.1"><br>
          Subnet Mask: <input type="text" id="${type}Mask${routerId}_${i}" placeholder="255.255.255.0"><br>
          ${showDuplex ? `<label><input type="checkbox" id="${type}Duplex${routerId}_${i}" checked> Duplex Full</label><br>` : ''}
          ${showOspfPriority ? `<label><input type="checkbox" id="${type}OspfCheck${routerId}_${i}" onchange="toggleOspfPriority('${type}', ${routerId}, ${i})"> OSPF Priority</label><br>
          <input type="number" id="${type}OspfPriority${routerId}_${i}" placeholder="1" min="0" max="255" style="display:none; margin-left: 20px;" title="OSPF Priority (0-255)"><br>` : ''}
        </div>`;
    }
    
    container.innerHTML += `</div>`;
  }
}

function toggleOspfPriority(type, routerId, interfaceIndex) {
  const checkbox = document.getElementById(`${type}OspfCheck${routerId}_${interfaceIndex}`);
  const priorityInput = document.getElementById(`${type}OspfPriority${routerId}_${interfaceIndex}`);
  priorityInput.style.display = checkbox.checked ? 'inline-block' : 'none';
}

function getDefaultSlot(type) {
  const defaults = { 'eth': 0, 'feth': 1, 'geth': 2, 'ser': 3 };
  return defaults[type] || 0;
}

function getInterfaceName(type) {
  const names = { 
    'eth': 'Ethernet', 
    'feth': 'Fast Ethernet', 
    'geth': 'Gigabit Ethernet', 
    'ser': 'Serial' 
  };
  return names[type] || type;
}

function toggleSlot(type, routerId) {
  const count = parseInt(document.getElementById(`${type}${routerId}`).value || 0);
  const wrapper = document.getElementById(`${type}SlotWrap${routerId}`);
  wrapper.style.display = count > 0 ? 'block' : 'none';
}

function toggleInterfaceConfig(type, routerId) {
  const count = parseInt(document.getElementById(`${type}${routerId}`).value || 0);
  const wrapper = document.getElementById(`${type}SlotWrap${routerId}`);
  wrapper.style.display = count > 0 ? 'block' : 'none';
}

function toggleRoutingFields(type, routerId) {
  const checkboxId = type === 'static' ? `staticRouting${routerId}` : `${type}${routerId}`;
  const checkbox = document.getElementById(checkboxId);
  const fieldsDiv = document.getElementById(`${type}Fields${routerId}`);
  fieldsDiv.style.display = checkbox.checked ? 'block' : 'none';
}

function generateStaticFields(routerId) {
  const container = document.getElementById(`staticRoutes${routerId}`);
  const count = document.getElementById(`staticCount${routerId}`).value;
  container.innerHTML = "";
  for (let j = 1; j <= count; j++) {
    container.innerHTML += `
      <div style="margin: 10px 0; padding: 10px; background: var(--bg-secondary); border-radius: 6px; border: 1px solid var(--border-color);">
        <label style="color: var(--accent-primary); font-weight: 600;">Network ${j}:</label><br>
        Destination Network: <input type="text" id="staticDest${routerId}_${j}" placeholder="192.168.1.0"><br>
        Destination Network Mask: <input type="text" id="staticMask${routerId}_${j}" placeholder="255.255.255.0"><br>
        Next Hop IP: <input type="text" id="staticNextHop${routerId}_${j}" placeholder="192.168.1.1">
      </div>`;
  }
}

function generateEigrpNetFields(routerId) {
  const container = document.getElementById(`eigrpNetworks${routerId}`);
  const count = document.getElementById(`eigrpNetCount${routerId}`).value;
  container.innerHTML = "";
  for (let j = 1; j <= count; j++) {
    container.innerHTML += `
      <div style="margin: 10px 0; padding: 10px; background: var(--bg-secondary); border-radius: 6px; border: 1px solid var(--border-color);">
        <label style="color: var(--accent-primary); font-weight: 600;">Network ${j}:</label><br>
        Network: <input type="text" id="eigrpNet${routerId}_${j}" placeholder="192.168.1.0"><br>
        Inverted Mask: <input type="text" id="eigrpWild${routerId}_${j}" placeholder="0.0.0.255">
      </div>`;
  }
}

function generateOspfNetFields(routerId) {
  const container = document.getElementById(`ospfNetworks${routerId}`);
  const count = document.getElementById(`ospfNetCount${routerId}`).value;
  container.innerHTML = "";
  for (let j = 1; j <= count; j++) {
    container.innerHTML += `
      <div style="margin: 10px 0; padding: 10px; background: var(--bg-secondary); border-radius: 6px; border: 1px solid var(--border-color);">
        <label style="color: var(--accent-primary); font-weight: 600;">Network ${j}:</label><br>
        Network: <input type="text" id="ospfNet${routerId}_${j}" placeholder="192.168.1.0"><br>
        Inverted Mask: <input type="text" id="ospfWild${routerId}_${j}" placeholder="0.0.0.255"><br>
        Area: <input type="number" id="ospfArea${routerId}_${j}" placeholder="0" min="0">
      </div>`;
  }
}

function generateLoopbackFields(routerId) {
  const count = parseInt(document.getElementById(`loop${routerId}`).value || 0);
  const container = document.getElementById(`loopContainer${routerId}`);
  const totalLoopbacks = count * 1; // Multiply by 1
  
  container.innerHTML = "";
  
  if (totalLoopbacks > 0) {
    container.innerHTML = `<div style="margin: 10px 0; padding: 10px; border: 2px solid var(--border-color); border-radius: 8px; background: var(--bg-secondary);">
      <strong style="color: var(--accent-primary);">Loopback Interfaces Configuration</strong><br><br>`;
    
    for (let i = 0; i < totalLoopbacks; i++) {
      container.innerHTML += `
        <div style="margin: 10px 0; padding: 10px; background: var(--bg-tertiary); border-radius: 6px; border: 1px solid var(--border-color);">
          <strong style="color: var(--accent-primary);">Loopback Interface ${i}</strong><br>
          IP Address: <input type="text" id="loopIP${routerId}_${i}" placeholder="10.${routerId}.${i}.1"><br>
          Subnet Mask: <input type="text" id="loopMask${routerId}_${i}" placeholder="255.255.255.0"><br>
        </div>`;
    }
    
    container.innerHTML += `</div>`;
  }
}

function generateCommands() {
  const count = document.getElementById('routerCount').value;
  let output = "";

  for (let i = 1; i <= count; i++) {
    const tab = document.getElementById(`router-tab-${i}`);
    const checkboxes = tab.querySelectorAll('input[type="checkbox"]');
    const hostnameInput = document.getElementById(`hostname${i}`);
    const domainInput = document.getElementById(`domain${i}`);
    output += `
--- Router ${i} Configuration ---
`;

    if (checkboxes[0].checked) output += `enable
`;
    if (checkboxes[1].checked) output += `configure terminal
`;
    if (checkboxes[2].checked && hostnameInput.value.trim()) output += `hostname ${hostnameInput.value.trim()}
`;
    if (checkboxes[3].checked && domainInput.value.trim()) output += `ip domain-name ${domainInput.value.trim()}
`;

    if (document.getElementById(`auth${i}`).checked) {
      const userCount = document.getElementById(`authCount${i}`).value;
      for (let j = 1; j <= userCount; j++) {
        const uname = document.getElementById(`user${i}_${j}_name`).value.trim();
        const pass = document.getElementById(`user${i}_${j}_pass`).value.trim();
        if (uname && pass) output += `username ${uname} password ${pass}
`;
      }
      const secret = document.getElementById(`enableSecret${i}`).value.trim();
      if (secret) output += `enable secret ${secret}
`;
    }

    const motd = document.getElementById(`motd${i}`);
    if (motd && motd.previousElementSibling.checked && motd.value.trim())
      output += `banner motd #${motd.value.trim()}#
`;
    const loginBanner = document.getElementById(`loginBanner${i}`);
    if (loginBanner && loginBanner.previousElementSibling.checked && loginBanner.value.trim())
      output += `banner login #${loginBanner.value.trim()}#
`;
    const execBanner = document.getElementById(`execBanner${i}`);
    if (execBanner && execBanner.previousElementSibling.checked && execBanner.value.trim())
      output += `banner exec #${execBanner.value.trim()}#
`;

    if (document.getElementById(`logSync${i}`).checked || document.getElementById(`noTimeout${i}`).checked) {
      output += `line con 0
 login local
`;
      if (document.getElementById(`logSync${i}`).checked) output += ` logging synchronous
`;
      if (document.getElementById(`noTimeout${i}`).checked) output += ` no exec-timeout
`;
      output += ` exit
`;
    }

    if (document.getElementById(`vty${i}`).checked) {
      output += `crypto key generate rsa modulus 1024
`;
      output += `line vty 0 4
 login local
 transport input telnet ssh
 exit
`;
    }

    // Interface configuration logic
    const usedSlots = new Set();
    const interfaces = [
      { key: 'eth', prefix: 'ethernet', name: 'Ethernet' },
      { key: 'feth', prefix: 'fastethernet', name: 'Fast Ethernet' },
      { key: 'geth', prefix: 'gigabitethernet', name: 'Gigabit Ethernet' },
      { key: 'ser', prefix: 'serial', name: 'Serial' }
    ];

    for (let iface of interfaces) {
      const interfaceCount = parseInt(document.getElementById(`${iface.key}${i}`).value || 0);
      const totalInterfaces = interfaceCount * 4;
      
      if (totalInterfaces > 0) {
        const slot = parseInt(document.getElementById(`${iface.key}Slot${i}`)?.value || 0);
        if (usedSlots.has(slot)) {
          alert(`Router ${i}: Slot ${slot} is already used. Please assign unique slots for each interface type.`);
          return;
        }
        usedSlots.add(slot);
        
        for (let k = 0; k < totalInterfaces; k++) {
          const ipAddress = document.getElementById(`${iface.key}IP${i}_${k}`)?.value.trim();
          const subnetMask = document.getElementById(`${iface.key}Mask${i}_${k}`)?.value.trim();
          const duplexFull = document.getElementById(`${iface.key}Duplex${i}_${k}`)?.checked;
          const ospfCheck = document.getElementById(`${iface.key}OspfCheck${i}_${k}`)?.checked;
          const ospfPriority = document.getElementById(`${iface.key}OspfPriority${i}_${k}`)?.value.trim();
          
          // Only configure interface if IP address is provided
          if (ipAddress && subnetMask) {
            output += `interface ${iface.prefix}${slot}/${k}
 ip address ${ipAddress} ${subnetMask}
 no shutdown
`;
            if (iface.key !== 'ser' && duplexFull) {
              output += ` duplex full
`;
            }
            if (iface.key !== 'ser' && ospfCheck && ospfPriority) {
              output += ` ip ospf priority ${ospfPriority}
`;
            }
            output += ` exit
`;
          }
        }
      }
    }

    const loopbackCount = parseInt(document.getElementById(`loop${i}`).value || 0);
    for (let l = 0; l < loopbackCount; l++) {
      const loopIP = document.getElementById(`loopIP${i}_${l}`)?.value.trim();
      const loopMask = document.getElementById(`loopMask${i}_${l}`)?.value.trim();
      
      if (loopIP && loopMask) {
        output += `interface loopback${l}
 ip address ${loopIP} ${loopMask}
 exit
`;
      } else {
        // Default configuration if no IP is specified
        output += `interface loopback${l}
 ip address 10.${i}.${l}.1 255.255.255.0
 exit
`;
      }
    }

    // Routing configuration
    if (document.getElementById(`staticRouting${i}`).checked) {
      const staticCount = document.getElementById(`staticCount${i}`).value;
      for (let j = 1; j <= staticCount; j++) {
        const dest = document.getElementById(`staticDest${i}_${j}`)?.value.trim();
        const mask = document.getElementById(`staticMask${i}_${j}`)?.value.trim();
        const nextHop = document.getElementById(`staticNextHop${i}_${j}`)?.value.trim();
        if (dest && mask && nextHop) {
          output += `ip route ${dest} ${mask} ${nextHop}
`;
        }
      }
    }

    if (document.getElementById(`eigrp${i}`).checked) {
      const asNumber = document.getElementById(`eigrpAS${i}`)?.value.trim();
      if (asNumber) {
        output += `router eigrp ${asNumber}
`;
        const eigrpNetCount = document.getElementById(`eigrpNetCount${i}`).value;
        for (let j = 1; j <= eigrpNetCount; j++) {
          const network = document.getElementById(`eigrpNet${i}_${j}`)?.value.trim();
          const wildcard = document.getElementById(`eigrpWild${i}_${j}`)?.value.trim();
          if (network && wildcard) {
            output += ` network ${network} ${wildcard}
`;
          }
        }
        output += ` exit
`;
      }
    }

    if (document.getElementById(`ospf${i}`).checked) {
      const processId = document.getElementById(`ospfProcess${i}`)?.value.trim();
      const routerId = document.getElementById(`ospfRouterID${i}`)?.value.trim();
      if (processId) {
        output += `router ospf ${processId}
`;
        if (routerId) {
          output += ` router-id ${routerId}
`;
        }
        const ospfNetCount = document.getElementById(`ospfNetCount${i}`).value;
        for (let j = 1; j <= ospfNetCount; j++) {
          const network = document.getElementById(`ospfNet${i}_${j}`)?.value.trim();
          const wildcard = document.getElementById(`ospfWild${i}_${j}`)?.value.trim();
          const area = document.getElementById(`ospfArea${i}_${j}`)?.value.trim();
          if (network && wildcard && area !== '') {
            output += ` network ${network} ${wildcard} area ${area}
`;
          }
        }
        output += ` exit
`;
      }
    }

    // Add "do wr" command if checked
    if (document.getElementById(`doWr${i}`)?.checked) {
      output += `do wr
`;
    }
  }

  document.getElementById('output').innerText = output || "No configuration selected.";
}

function copyToClipboard() {
  const output = document.getElementById('output').innerText;
  if (!output) {
    showNotification("Nothing to copy.");
    return;
  }
  navigator.clipboard.writeText(output).then(() => {
    showNotification("Copied to clipboard!");
  }).catch(() => {
    showNotification("Failed to copy.");
  });
}

function showNotification(message) {
  // Remove existing notification if any
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  // Add to body
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}
