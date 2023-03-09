export const formatDate = (time) => {
  time = new Date(time * 1000)
  .toLocaleDateString('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  })
  
  return time
}