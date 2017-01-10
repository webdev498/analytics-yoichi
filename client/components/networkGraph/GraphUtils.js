export function getIcon(nodeType, nodeStatus, nodeAction) {
  nodeType = nodeType.toLowerCase();
  if (nodeType === 'anomaly') {
    nodeStatus = 'malicious';
  }
  const iconPath = '/img/Node-' + nodeStatus + '-' + nodeAction + '/' + nodeType + '-' + nodeStatus + '.png';

  if (nodeType !== '') {
    return iconPath;
  }
  else {
    return '/img/inactive.png';
  }
}
