'use server';

import { siteConfig } from '@/components/config';

export const SendWebhook = async (url, data) => {
  if (!url || !data) {
    return false;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response?.ok || false;
  } catch (error) {
    // console.warn('Error sending webhook:', error);
    return false;
  }
};

export const SendNtfy = async (ntfy, data) => {
  if (!ntfy?.enabled || !ntfy?.url || !data) {
    return false;
  }

  try {
    const response = await fetch(
      ntfy.url,
      {
        method: 'POST',
        headers: {
          'Icon': `https://www.wapy.dev/icons/icon-192.png`,
          ...(ntfy?.token ? { 'Authorization': `Bearer ${ntfy.token}` } : {}),
        },
        body: JSON.stringify({
          topic: ntfy?.topic || 'wapy-dev',
          tags: [siteConfig.name, 'subscription-reminder'],
          priority: 3,
          click: siteConfig.url,
          ...data,
        }),
      }
    );

    return response?.ok || false;
  } catch (error) {
    // console.warn('Error sending ntfy:', error);
    return false;
  }
};

export const SendDiscord = async (discord, data) => {
  if (!discord?.enabled || !discord?.url || !data) {
    return false;
  }

  const translations = data.translations || {};

  const payload = {
    username: siteConfig.name,
    avatar_url: `https://www.wapy.dev/icons/icon-192.png`,
    content: `💡 **${translations.header}**`,
    embeds: [
      {
        title: data.title,
        description: data.message,
        color: 121256,
        thumbnail: {
          url: `https://www.wapy.dev/icons/icon-192.png`,
        },
        provider: {
          name: siteConfig.name,
          url: siteConfig.url,
        },
        fields: [
          ...(data.markAsPaidUrl
            ? [{
            name: translations.paymentQuestion,
            value: `[${translations.markAsPaid} ✅](${data.markAsPaidUrl})`,
            }]
            : []
          ),
          {
            name: translations.viewDetails,
            value: `[${translations.visitDashboard} 🔗](${siteConfig.url})`,
          },
        ],
        footer: {
          text: translations.footer,
        }
      },
    ],
  };

  return SendWebhook(
    discord.url,
    payload
  );
};

export const SendSlack = async (slack, data) => {
  if (!slack?.enabled || !slack?.url || !data) {
    return false;
  }

  const translations = data.translations || {};

  const payload = {
    text: `${translations.header}\n${data.title}\n${data.message}`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `${translations.header} 💡`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${data.title}*\n${data.message}`,
        },
        accessory: {
          type: 'image',
          image_url: `https://www.wapy.dev/icons/icon-192.png`,
          alt_text: siteConfig.name,
        },
      },
      {
        type: 'actions',
        elements: [
          ...(data.markAsPaidUrl
            ? [
                {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: `💰 ${translations.markAsPaid}`,
                  },
                  url: data.markAsPaidUrl,
                  style: 'primary',
                },
              ]
            : []),
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: `🔗 ${translations.visitDashboard}`,
            },
            url: siteConfig.url,
          },
        ],
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: translations.footer,
          },
        ],
      },
    ],
  };

  return SendWebhook(slack.url, payload);
};
