// Wallet -> I have an account
$('#xel-generate-account').click( function(e) {
  e.preventDefault();

  $('#xel-new-passphrase').val('');
  $('#xel-new-account').val('');
  $('#xel-new-publickey').val('');
  $('#xel-new-pass-qrcode').html('');
  $('#xel-new-account-qrcode').html('');
  $('#xel-new-section').addClass('d-none');

  $('#xel-generate-own-account-tip').removeClass('d-none');
});

// Wallet -> create new
$('#xel-random-passphrase').click( function(e) {
  e.preventDefault();
  var password = PassPhraseGenerator;
  password.generatePassPhrase();
  var new_random_password = password.passPhrase;

  $('#xel-new-passphrase').val(new_random_password);

  var new_random_password = $('#xel-new-passphrase').val().trim();
  var publicKey =  NRS.getPublicKey(converters.stringToHexString(new_random_password)) ;
  var accountId = NRS.getAccountIdFromPublicKey(publicKey, true);
  $('#xel-new-publickey').val(publicKey);
  $('#xel-new-account').val(accountId);

  // generate qr
  $('#xel-new-pass-qrcode').html('');
  $('#xel-new-account-qrcode').html('');

  $('#xel-new-section').removeClass('d-none');

  $('#xel-new-pass-qrcode').qrcode({ width: 220, height: 220, text: new_random_password });
  $('#xel-new-account-qrcode').qrcode({ width: 220, height: 220, text: accountId });
  // hide hint
  $('#xel-generate-own-account-tip').addClass('d-none');
});

// Wallet -> Clear
$('#xel-clear-new-section').click( function(e) {
  e.preventDefault();
  $('#xel-new-passphrase').val('');
  $('#xel-new-account').val('');
  $('#xel-new-publickey').val('');
  $('#xel-new-pass-qrcode').html('');
  $('#xel-new-account-qrcode').html('');
  $('#xel-new-section').addClass('d-none');

  $('#xel-generate-own-account-tip').addClass('d-none');
});

function generate_account_and_qr() {
  $('#xel-generate-own-account-tip').removeClass('d-none');
  var new_random_password = $('#xel-new-passphrase').val().trim();
  var publicKey =  NRS.getPublicKey(converters.stringToHexString(new_random_password)) ;
  var accountId = NRS.getAccountIdFromPublicKey(publicKey, true);
  $('#xel-new-publickey').val(publicKey);
  $('#xel-new-account').val(accountId);

  // generate qr
  $('#xel-new-pass-qrcode').html('');
  $('#xel-new-account-qrcode').html('');

  $('#xel-new-section').removeClass('d-none');

  $('#xel-new-pass-qrcode').qrcode({ width: 220, height: 220, text: new_random_password });
  $('#xel-new-account-qrcode').qrcode({ width: 220, height: 220, text: accountId });
}

// Wallet -> Autogenerate
$('#xel-new-passphrase').keyup( function(e) {
  generate_account_and_qr();
});

// Wallet -> Print
$('#xel-print-new-section').click(function(e) {
  e.preventDefault();
  // clear old data
  $('#xel-new-print-account').html('');
  $('#xel-new-print-account-qrcode').html('');
  $('#xel-new-print-account-passphrase-qrcode').html('');
  // update data for accountRS
  accRS = $('#xel-new-account').val();
  $('#xel-new-print-account').html( accRS );
  $('#xel-new-print-account-qrcode').qrcode({ width: 180, height: 180, text: accRS });
  // update data for private section
  pubK = $('#xel-new-publickey').val().trim();
  prvK = $('#xel-new-passphrase').val().trim();
  $('#xel-new-print-account-public-key').html( pubK );
  $('#xel-new-print-account-passphrase').html( prvK );
  $('#xel-new-print-account-passphrase-qrcode').qrcode({ width: 180, height: 180, text: prvK });;
  // hide other printable fields
  $('#xel-section-print-qr-section').removeClass('d-print-block');
  // show form for print
  $('#xel-section-print-new-section').addClass('d-print-block')

  window.print();
});

// ------------------------------------------------------------------------------

// Token -> Help
$('#xel-token-help-sign').click(function(e) {
  e.preventDefault();
  if ( $('#xel-token-help').hasClass('d-none') ) {
    $('#xel-token-help').removeClass('d-none');
  } else {
    $('#xel-token-help').addClass('d-none');
  }
});

// Token -> Generate
$('#xel-token-generate').click(function(e) {
  e.preventDefault();
  var site = $('#xel-token-site').val().trim();
  var pass = $('#xel-token-passphrase').val().trim();
  if ( site.length == 0 || pass.length == 0 ) {
    alert('Please fill the fields!');
    return;
  }

  var token = NRS.generateToken(site, pass);
  $('#xel-token-text').val(token);
});

// Token -> Clear
$('#xel-clear-token-section').click(function(e) {
  e.preventDefault();
  $('#xel-token-site').val('');
  $('#xel-token-passphrase').val('');
  $('#xel-token-text').val('');
});

// ------------------------------------------------------------------------------

// QR -> Clear
$('#xel-clear-qr-section').click( function(e) {
  e.preventDefault();
  $('#xel-qrcode').html('');
  $('#xel-text-for-qr-code').val('');
  $('#xel-qr-section').addClass('d-none');
});

// QR -> Generate
$('#xel-text-for-qr-code').keyup( function(e) {
  var text4qr = $('#xel-text-for-qr-code').val().trim();
  $('#xel-qr-qrcode').html('');
  $('#xel-qr-qrcode').qrcode({ width: 220, height: 220, text: text4qr });
  $('#xel-qr-section').removeClass('d-none');
});


$('#xel-generate-qr-code').click( function(e) {
  e.preventDefault();
  var text4qr = $('#xel-text-for-qr-code').val().trim();
  $('#xel-qr-qrcode').html('');
  $('#xel-qr-qrcode').qrcode({ width: 220, height: 220, text: text4qr });
  $('#xel-qr-section').removeClass('d-none');

});

// QR -> Print
$('#xel-print-qr-section').click(function(e) {
  e.preventDefault();

  var text4qr = $('#xel-text-for-qr-code').val().trim();
  $('#xel-qr-print-qrcode').html('');
  $('#xel-qr-print-qrcode').qrcode({ width: 180, height: 180, text: text4qr });
  $('#xel-qr-print-account').html(text4qr);

  // hide other printable fields
  $('#xel-section-print-new-section').removeClass('d-print-block')
  // show form for print
  $('#xel-section-print-qr-section').addClass('d-print-block');



  window.print();
});

// QR -> Help
$('#xel-qr-help-sign').click(function(e) {
  e.preventDefault();
  if ( $('#xel-qr-help').hasClass('d-none') ) {
    $('#xel-qr-help').removeClass('d-none');
  } else {
    $('#xel-qr-help').addClass('d-none');
  }
});

// ------------------------------------------------------------------------------

// Offline -> Help
$('#xel-offline-help-sign').click(function(e) {
  e.preventDefault();

  if ( $('#xel-offline-help').hasClass('d-none') ) {
    $('#xel-offline-help').removeClass('d-none');
  } else {
    $('#xel-offline-help').addClass('d-none');
  }

});

// OFFLINE -> Sign
$('#xel-sign-transaction').click( function(e) {
  e.preventDefault();

  // unsignedJSON
  var unsignedBytes = $('#xel-unsigned-bytes').val().trim();
  // secert
  var secret = $('#xel-sign-passphrase').val().trim();

  if ( secret.length < 10 ) {
    alert('Your passphrase is too weak! Please make sure that you have entered your passphrase correctly. If you did, it is better to create a new account with a stronger passphrase and transfer all your funds to it!');
  }

  var signature = NRS.signBytes(unsignedBytes, converters.stringToHexString(secret));

  var byteArray = converters.hexStringToByteArray(unsignedBytes);
  var sigPos = 2 * 69; // 2 * (bytes before signature from TransactionImpl newTransactionBuilder())
  var sigLen = 2 * 64;
  var payload = unsignedBytes.substr(0, sigPos) + signature + unsignedBytes.substr(sigPos + sigLen);

  $('#xel-signed-bytes').val(payload);

  //console.log(payload);
});

// OFFLINE -> Check
$('#xel-check-unsigned-tx').click(function(e) {
  e.preventDefault();

  var unsignedBytes = $('#xel-unsigned-bytes').val().trim();
  var bytes = converters.hexStringToByteArray(unsignedBytes);

  // if sig != 0 transaction already sign
  var sig = converters.byteArrayToSignedInt32(bytes.slice(96, 100));

  if ( sig == 0 ) {
		// send byteArray to verify
    tx = verifyTransactionBytes(bytes);

    ttype = get_xel_transaction_type(tx.type, tx.subtype);
    show_review(1, 'Transaction type', ttype);

    cchain  = get_chain_name(tx.chain);
    show_review(2, 'Child Chain', cchain);

    sender = NRS.getAccountIdFromPublicKey( tx.publicKey, true);
    show_review(3, 'Sender', sender);

    if ( tx.recipient > 0 ) {
      recipient = NRS.convertNumericToRSAccountFormat(tx.recipient);
    } else {
      recipient = "Genesis Account";
    }
    show_review(4, 'Recipient', recipient);

    amount = nqt2chain(tx.chain, tx.amountNQT);
    show_review(5,'Amount', amount + " " + cchain);

    fee = nqt2chain(tx.chain, tx.feeNQT);
    show_review(6,'Fee', fee + " " + cchain);

    //console.log(tx);

  } else {
    alert('The text you inserted is an already-signed transaction.');
  }

});

// OFFLINE -> clear
$('#xel-clear-sign-transaction').click(function(e) {
  e.preventDefault();
  show_review(1,'&nbsp;', '');show_review(2,'&nbsp; ', '');show_review(3,'&nbsp; ', '');show_review(4,'&nbsp; ', '');show_review(5,'&nbsp; ', '');show_review(6,'&nbsp; ', '');
  $('#xel-signed-bytes').val('');
  $('#xel-sign-passphrase').val('');
  $('#xel-unsigned-bytes').val('');

});

// MENU -> Smooth scroll
$('.nav-link').click( function(e) {
  e.preventDefault();
  url = $(this).data('url');
  pos_y = $("[name = '" + url + "']").position().top;
  $(window).scrollTop( pos_y - 120 );
});

// Account -> show/hide password
$('#xel-new-passphrase-switcher').click( function(e) {
  if ( $('#xel-new-passphrase').attr('type') === 'password' ) {
    $('#xel-new-passphrase').prop('type', 'text');
    $('#xel-new-passphrase-switcher').html('Hide');
  } else {
    $('#xel-new-passphrase').prop('type', 'password');
    $('#xel-new-passphrase-switcher').html('Show');
  }
});

// TOKEN -> show/hide password
$('#xel-token-passphrase-switcher').click( function(e) {
  if ( $('#xel-token-passphrase').attr('type') === 'password' ) {
    $('#xel-token-passphrase').prop('type', 'text');
    $('#xel-token-passphrase-switcher').html('Hide');
  } else {
    $('#xel-token-passphrase').prop('type', 'password');
    $('#xel-token-passphrase-switcher').html('Show');
  }
});
// SIGN -> show/hide password
$('#xel-sign-passphrase-switcher').click( function(e) {
  if ( $('#xel-sign-passphrase').attr('type') === 'password' ) {
    $('#xel-sign-passphrase').prop('type', 'text');
    $('#xel-sign-passphrase-switcher').html('Hide');
  } else {
    $('#xel-sign-passphrase').prop('type', 'password');
    $('#xel-sign-passphrase-switcher').html('Show');
  }
});

//NRS.constants.GENESIS_BLOCK_ID = response.genesisBlockId;
//NRS.constants.VOTING_MODELS = response.votingModels;
//NRS.constants.MIN_BALANCE_MODELS = response.minBalanceModels;
//NRS.constants.HASH_ALGORITHMS = response.hashAlgorithms;
//NRS.constants.PHASING_HASH_ALGORITHMS = response.phasingHashAlgorithms;
//NRS.constants.MINTING_HASH_ALGORITHMS = response.mintingHashAlgorithms;
//NRS.constants.MAX_TAGGED_DATA_DATA_LENGTH = response.maxTaggedDataDataLength;
//NRS.constants.MAX_PRUNABLE_MESSAGE_LENGTH = response.maxPrunableMessageLength;
NRS.constants.EPOCH_BEGINNING = 1514764800000;
//NRS.constants.REQUEST_TYPES = response.requestTypes;
//NRS.constants.API_TAGS = response.apiTags;
//NRS.constants.SHUFFLING_STAGES = response.shufflingStages;
//NRS.constants.SHUFFLING_PARTICIPANTS_STATES = response.shufflingParticipantStates;
//NRS.constants.DISABLED_APIS = response.disabledAPIs;
//NRS.constants.DISABLED_API_TAGS = response.disabledAPITags;
//NRS.constants.PEER_STATES = response.peerStates;
//NRS.constants.LAST_KNOWN_BLOCK.id = response.lastKnownBlock.id;
//NRS.constants.LAST_KNOWN_BLOCK.height = response.lastKnownBlock.height;
//NRS.constants.PROXY_NOT_FORWARDED_REQUESTS = response.proxyNotForwardedRequests;
//NRS.constants.CHAIN_PROPERTIES = response.chainProperties;
//NRS.constants.PROXY_NOT_FORWARDED_REQUESTS = response.proxyNotForwardedRequests;
NRS.constants.ACCOUNT_PREFIX = "XEL";
NRS.constants.ACCOUNT_REGEX_STR = "^(XEL|NXT)-[A-Z0-9_]{4}-[A-Z0-9_]{4}-[A-Z0-9_]{4}-[A-Z0-9_]{5}";
NRS.constants.ACCOUNT_RS_MATCH = NRS.getRsAccountRegex("XEL");
NRS.constants.ACCOUNT_NUMERIC_MATCH = NRS.getNumericAccountRegex();
NRS.constants.ACCOUNT_MASK_ASTERIX = "XEL" + "-****-****-****-*****";
NRS.constants.ACCOUNT_MASK_UNDERSCORE = "XEL" + "-____-____-____-_____";
NRS.constants.ACCOUNT_MASK_PREFIX = "XEL" + "-";
NRS.constants.ACCOUNT_MASK_LEN = NRS.constants.ACCOUNT_MASK_PREFIX.length;
//NRS.constants.INITIAL_BASE_TARGET = parseInt(response.initialBaseTarget);
NRS.constants.MAX_INT_JAVA = 2147483647;


console.log('Welcome to Paper Wallet for XEL');
