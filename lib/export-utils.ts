import domtoimage from 'dom-to-image';

export async function exportImageWithGradient(
  elementId: string
): Promise<void> {
  try {
    const element = document.getElementById(elementId);

    if (!element) {
      throw new Error(`Element with id '${elementId}' not found`);
    }

    const dataUrl = await domtoimage.toPng(element, {
      quality: 1.0,
      bgcolor: 'transparent',
      width: element.offsetWidth,
      height: element.offsetHeight,
      style: {
        transform: 'scale(1)',
        'transform-origin': 'top left',
      },
    });

    const link = document.createElement('a');
    link.download = `niceshot-export-${Date.now()}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
}
