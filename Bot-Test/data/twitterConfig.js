/**
 * temporary local and prod keys
 */
const config = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY || "toRy0glo5cRxIFkZKHkNBik0e",
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET || "QBKoOYw4hxqaA4kVxd7FDv2mTuglZ7IrO8cS9F6ikQjcM3ygQh",
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY || "1072506751549886464-dH4xVkRI8wXyGqdJmL6xKzyy0uktMl",
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || "2uWbUY0ZTHmSXVlthNhA26kVtt4aTLOMkt9MyI72wLAmP",
}

module.exports.Config = config