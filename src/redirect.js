if (
  window.location.hash.indexOf("#invite_token=") !== -1 ||
  window.location.hash.indexOf("#recovery_token=") !== -1
) {
  window.location = "/admin/" + window.location.hash
}
