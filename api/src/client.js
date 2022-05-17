console.log("We're in boys.")

const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
  .then(FingerprintJS => FingerprintJS.load())

fpPromise
  .then(fp => fp.get())
  .then(result => {
    const visitorId = result.visitorId
    console.log(visitorId)
    data = {
      fingerprint : result.visitorId,
      protocol : window.location.protocol,
      hostname: window.location.hostname,
      pathname : window.location.pathname,
      search : window.location.search,
      hash : window.location.hash
    }
    fetch("$CALLBACK_URL?id=$DATA_ID", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  })